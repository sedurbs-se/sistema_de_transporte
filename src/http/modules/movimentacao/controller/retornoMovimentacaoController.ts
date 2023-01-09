import prisma from "@shared/prisma.index";
import { NextApiRequest, NextApiResponse } from "next";
import AppError from "src/http/errors/AppError";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";


const retornoMovimentacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

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
        dtsaida,
        dtretorno,
        kminicial,
        kmfinal,
        status_id,
    } = req.body;


    const movimentacao = await prisma.movimentacao.update({
        where: {
            id: id as string,
        },
        data: {
            motorista_id,
            dtsaida,
            dtretorno,
            kminicial,
            kmfinal,
            status_id,
        }
    })

    await prisma.solicitacao.update({
        where: {
            id: solicitacao_id,
        },
        data: {
            movimentacao_id: id as string
        }
    });

    res.status(200).json(movimentacao);
});

export default retornoMovimentacaoController;