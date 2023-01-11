


import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSolicitacaoAutorizadasController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { page, limit } = req.query;

    const statusAutorizado = await prisma.statusSolicitacao.upsert({
        where: {
            nome: 'AUTORIZADO'
        },
        create: {
            nome: 'AUTORIZADO'
        },
        update: {}
    });

    const solicitacoes = await prisma.solicitacao.findMany({
        where: {
            status_solicitacao_id: statusAutorizado.id
        },
        skip: (Number(page) - 1) * Number(limit), take: Number(limit),
        include: {
            municipiosolicitacao: {
                select: {
                    municipio: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            },
            statussolicitacao: {
                select: {
                    nome: true,
                    id: true
                }
            },
            tiposolicitacao: {
                select: {
                    nome: true,
                    id: true
                }
            }

        }
    })

    const mappedSolicitacoes = solicitacoes.map(solicitacao => {
        return {
            ...solicitacao,
            municipiosolicitacao: solicitacao.municipiosolicitacao.map(municipio => municipio.municipio)
        }
    })

    res.status(200).json({
        solicitacoes: mappedSolicitacoes
    });
});

export { listSolicitacaoAutorizadasController }