import prisma from "@shared/prisma.index";
import { Request, Response } from "src/http/type";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";


const saidaMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const {
        solicitacao_id,
        veiculos_id,
        motorista_id,
        dtsaida,
        status_id,
        observacao,
    } = req.body;

    await prisma.movimentacao.create({
        data: {
            solicitacao_id,
            motorista_id,
            veiculos_id,
            dtsaida: new Date(dtsaida),
            status_id,
            observacao,
        }
    })

    res.status(200).json({});

});

export default saidaMovimentacaoController;