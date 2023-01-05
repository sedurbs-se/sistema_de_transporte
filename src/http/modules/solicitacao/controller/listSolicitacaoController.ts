

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, limit } = req.query;

    const solicitacoes = await prisma.solicitacao.findMany({
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

export { listSolicitacaoController }