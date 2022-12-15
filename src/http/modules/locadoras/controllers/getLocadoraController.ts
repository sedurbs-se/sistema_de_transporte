import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import { getFormatedDateTimeString } from "@shared/utils/dateUtils";


// get one note from with a note id request dynamically
const getLocadoraController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const locadora = await prisma.locadora.findUnique({
        where: {
            id: id as string
        },
    });

    if(!locadora) {
        throw new AppError('Locadora não encontrada', 404)
    }

    res.status(200).json({
        locadora: {
            ...locadora,
            createdAt: getFormatedDateTimeString(locadora.createdAt),
            updatedAt: getFormatedDateTimeString(locadora.updatedAt)
        }
    });
});

export { getLocadoraController }