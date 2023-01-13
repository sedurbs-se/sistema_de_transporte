

import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {
    const movimentacoes = await prisma.movimentacao.findMany({
        where: {
            solicitacao_id: {
                not: undefined
            }
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
        movimentacoes
    });
});

export { listMovimentacaoController }