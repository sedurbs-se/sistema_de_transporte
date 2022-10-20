

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listStatusSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const statusSolicitacoes = await prisma.statusSolicitacao.findMany();

    res.status(200).json({
        statusSolicitacoes
    });
});

export { listStatusSolicitacaoController }