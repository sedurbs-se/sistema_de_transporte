import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const createSetorController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { codigo,
        descricao,
        sigla,
        responsavel,
        ramal, } = req.body;

    const setor = await prisma.setor.create({
        data: {
            codigo,
            descricao,
            sigla,
            responsavel,
            ramal,
        }
    });

    res.status(200).json({ setor });
});

export { createSetorController }