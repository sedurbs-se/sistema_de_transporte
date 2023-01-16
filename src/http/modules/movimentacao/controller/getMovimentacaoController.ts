

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "src/http/errors/AppError";


// get one note from with a note id request dynamically
const getMovimentacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }
    
    const movimentacao = await prisma.movimentacao.findFirst({
        where: {
            id: id as string
        },
        include: {
            status: {
                select: {
                    nome: true
                }
            },
            veiculo: {
                select: {
                    placa: true,
                    quilometragemAtual: true,
                }
            },
            motorista: {
                select: {
                    nome: true
                }
            }
        }
    });

    res.status(200).json({
        movimentacao
    });
});

export { getMovimentacaoController }