

import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listStatusSolicitacaoController = catchAsyncErrors(async (req: Request, res: Response) => {
    const statusSolicitacoes = await prisma.statusSolicitacao.findMany();

    res.status(200).json({
        statusSolicitacoes
    });
});

export { listStatusSolicitacaoController }