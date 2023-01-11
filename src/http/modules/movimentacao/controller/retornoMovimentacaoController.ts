import prisma from "@shared/prisma.index";
import { Request, Response } from "src/http/type";
import AppError from "src/http/errors/AppError";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";


const retornoMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError("ID não informado", 400);
    };

    const movimentacaoExist = await prisma.movimentacao.findUnique({ where: { id: id as string } });

    if (!movimentacaoExist) {
        throw new AppError("Movimentação não encontrada", 400);
    };

    const {
        solicitacao_id,
        motorista_id,
        veiculo_id,
        dtsaida,
        dtretorno,
        kminicial,
        kmfinal,
        status_id,
    } = req.body;

    await prisma.veiculo.update({
        where: {

            id: veiculo_id,
        },
        data: {
            quilometragemAtual: kmfinal
        }

    })

    const movimentacao = await prisma.movimentacao.update({
        where: {
            id: id as string,
        },
        data: {
            solicitacao_id,
            motorista_id,
            dtsaida,
            dtretorno,
            status_id,
        }
    })

    res.status(200).json(movimentacao);
});

export default retornoMovimentacaoController;