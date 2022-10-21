

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listTipoSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const tipoSolicitacoes = await prisma.tipoSolicitacao.findMany();

    res.status(200).json({
        tipoSolicitacoes
    });
});

export { listTipoSolicitacaoController }