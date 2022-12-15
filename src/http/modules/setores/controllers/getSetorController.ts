import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import { getFormatedDateTimeString } from "@shared/utils/dateUtils";


// get one note from with a note id request dynamically
const getSetorController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const setor = await prisma.setor.findUnique({
        where: {
            id: id as string
        },
    });

    if(!setor) {
        throw new AppError('Setor não encontrado', 404)
    }

    res.status(200).json({
        setor: {...setor,
        createdAt: getFormatedDateTimeString(setor.createdAt),
        updatedAt: getFormatedDateTimeString(setor.updatedAt)}
    });
});

export { getSetorController }