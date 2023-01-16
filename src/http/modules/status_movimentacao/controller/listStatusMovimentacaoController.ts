

import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listStatusMovimentacaoController = catchAsyncErrors(async (req: Request, res: Response) => {
    const statusMovimentacao = await prisma.movimentacaoStatus.findMany();

    res.status(200).json({
        statusMovimentacao
    });
});

export { listStatusMovimentacaoController }