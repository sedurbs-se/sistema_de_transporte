

import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
<<<<<<< HEAD
const listMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {
    const movimentacoes = await prisma.movimentacao.findMany();
=======
const listMovimentacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
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
>>>>>>> dab29fa24c056da0513d4ae460c0da180466b4f7

    res.status(200).json({
        movimentacoes
    });
});

export { listMovimentacaoController }