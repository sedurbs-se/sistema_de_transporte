import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import { ICreateSolicitacaoDTO } from "@domain/query/createSolicitacao";
import AppError from "src/http/errors/AppError";


const createSolicitacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

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

    // Verifica se existem mais de 4 solicitacoes para fora de aracaju 
    const solicitacoesForaAracaju = await prisma.solicitacao.findMany({
        where: {
            municipiosolicitacao: {
                some: {
                    municipio: {
                        nome: {
                            not: "Aracaju"
                        }
                    }
                }
            },
            statussolicitacao: {
                nome: {
                   notIn: ["CANCELADO", "AUTORIZADO"]
                }
            }
        }
    });

    if (municipios.find(m => m != "Aracaju") && solicitacoesForaAracaju.length >= 4) {
        throw new AppError("Não é possível realizar mais de 4 solicitações para fora de Aracaju", 400);
    }

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