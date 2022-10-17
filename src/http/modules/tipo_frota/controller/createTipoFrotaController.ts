

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

const createTipoFrotaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { nome } = req.body;

    const tipo = await prisma.tipoFrota.create({
        data: {
            nome
        }
    });

    res.status(200).json({ tipo });
});

export { createTipoFrotaController }