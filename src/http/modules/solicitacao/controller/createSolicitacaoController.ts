import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import { ICreateSolicitacaoDTO } from "@domain/query/createSolicitacao";
import AppError from "src/http/errors/AppError";


const createSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        usuario,
        ramal,
        num_ocupantes,
        atividade,
        data_hora_saida,
        tipo_solicitacao_id,
        status_solicitacao_id,
        setor_id,
        municipios,
        observacao,
    } = req.body as ICreateSolicitacaoDTO["params"];

    Object.keys(req.body).forEach(key => {
        if (!req.body[key]) {
            throw new AppError('Todos os campos são obrigatórios', 400)
        };
    })

    const solicitacao = await prisma.solicitacao.create({
        data: {
            usuario,
            ramal,
            num_ocupantes,
            data_hora_saida: new Date(data_hora_saida),
            atividade,
            tipo_solicitacao_id,
            status_solicitacao_id,
            setor_id,
            observacao,
        }
    });

    const municipiosInDB = await prisma.municipio.findMany({
        where: {
            nome: {
                in: municipios
            }
        },
        select: {
            id: true,
            nome: true
        }
    })

    if (municipiosInDB.length != municipios.length) {
        throw new AppError("Município não encontrado", 400);
    }

    const municipiosData = municipios.map(municipio => {
        const { id: municipio_id } =
            municipiosInDB.find(({ nome }) => nome == municipio) as { id: string, nome: string };

        return {
            municipio_id,
            solicitacao_id: solicitacao.id
        }
    });

    const municipiosCreated = await prisma.municipiosolicitacao.createMany({
        data: municipiosData
    });

    res.status(200).json({
        ...solicitacao, municipios: municipiosCreated
    });
});

export { createSolicitacaoController }