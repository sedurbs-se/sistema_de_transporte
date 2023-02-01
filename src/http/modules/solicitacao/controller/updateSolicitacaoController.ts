import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import { ICreateSolicitacaoDTO } from "@domain/query/createSolicitacao";
import AppError from "src/http/errors/AppError";

const updateSolicitacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const existSolicitacao = await prisma.solicitacao.findUnique({ where: { id: id as string } })

    if (!existSolicitacao) {
        throw new AppError('Solicitação não encontrada', 400)
    }

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

    // valida body params


    const solicitacao = await prisma.solicitacao.update({
        where: { id: id as string },
        data: {
            usuario,
            ramal,
            num_ocupantes,
            data_hora_saida:new Date(data_hora_saida),
            atividade,
            tipo_solicitacao_id,
            status_solicitacao_id,
            setor_id,
            observacao,
        }
    });


    // Deleta todos os municipios da solicitacao
    await prisma.municipiosolicitacao.deleteMany({
        where: {
            solicitacao_id: solicitacao.id
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

export { updateSolicitacaoController }