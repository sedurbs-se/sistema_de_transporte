import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

// get one note from with a note id request dynamically
const deleteSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    await prisma.solicitacao.delete({ where: { id: id as string } })

    res.status(202).send({});
});

export { deleteSolicitacaoController }
