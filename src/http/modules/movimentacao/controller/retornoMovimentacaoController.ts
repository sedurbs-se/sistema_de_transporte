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
    console.log('alo')

    const {
        dtsaida,
        dtretorno,
        observacao,
        quilometragemFinal,
        status_id,
    } = req.body;

    await prisma.veiculo.update({
        where: {
            id: movimentacaoExist.veiculos_id,
        },
        data: {
            quilometragemAtual: Number(quilometragemFinal)
        }

    })

    const movimentacao = await prisma.movimentacao.update({
        where: {
            id: id as string,
        },
        data: {
            dtretorno:  new Date(dtretorno),
            status_id,
            observacao
        }
    })

    res.status(200).json(movimentacao);
});

export default retornoMovimentacaoController;