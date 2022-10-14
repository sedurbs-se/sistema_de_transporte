import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const getMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const motorista = await prisma.motorista.findUnique({
        where: {
            id: id as string
        },
    });

    res.status(200).json({
        motorista
    });
});

export { getMotoristaController }