import prisma from "@shared/prisma.index";
import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";


const saidaMovimentacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        solicitacao_id,
        veiculos_id,
        motorista_id,
        dtsaida,
        status_id,
        observacao,
    } = req.body;

    const movimentacao = await prisma.movimentacao.create({
        data: {
            motorista_id,
            veiculos_id,
            dtsaida,
            status_id,
            observacao,
        }
    })

    await prisma.solicitacao.update({
        where: {
            id: solicitacao_id,
        },
        data: {
            movimentacao_id: movimentacao.id
        }
    });


    res.status(200).json({});

});

export default saidaMovimentacaoController;