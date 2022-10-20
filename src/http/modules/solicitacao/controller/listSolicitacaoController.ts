

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const solicitacoes = await prisma.solicitacao.findMany();

    res.status(200).json({
        solicitacoes
    });
});

export { listSolicitacaoController }