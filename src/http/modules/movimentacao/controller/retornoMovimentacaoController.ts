import prisma from "@shared/prisma.index";
import { Request, Response } from "src/http/type";
import AppError from "src/http/errors/AppError";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";
import dayjs from "dayjs";

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
            dtretorno:  dayjs(dtretorno).locale('pt-br').format(),
            status_id,
            observacao,
            km_retorno: Number(quilometragemFinal),
        }
    })

    res.status(200).json(movimentacao);
});

export default retornoMovimentacaoController;