import prisma from "@shared/prisma.index";
import { Request, Response } from "src/http/type";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";
import AppError from "src/http/errors/AppError";

const saidaMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const {
        solicitacao_id,
        veiculos_id,
        motorista_id,
        dtsaida,
        status_id,
        observacao,
    } = req.body;

    const veiculo = await prisma.veiculo.findUnique(
        {
            where: {
                id: veiculos_id
            }
        }
    )

    if (!veiculo) {
        throw new AppError("Veículo não encontrado", 400);
    }

    await prisma.movimentacao.create({
        data: {
            solicitacao_id,
            motorista_id,
            veiculos_id,
            dtsaida: new Date(dtsaida),
            status_id,
            observacao,
            km_saida: veiculo?.quilometragemInicial,
        }
    })

    res.status(200).json({});

});

export default saidaMovimentacaoController;