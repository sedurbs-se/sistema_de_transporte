import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

// get one note from with a note id request dynamically
const deleteMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    };

    const existentMov = await prisma.movimentacao.findUnique({ where: { id: id as string } })

    if (!existentMov) {
        throw new AppError('Movimentação não encontrada', 400)
    }

    await prisma.movimentacao.delete({ where: { id: id as string } })

    res.status(202).send({});
});

export { deleteMovimentacaoController }
