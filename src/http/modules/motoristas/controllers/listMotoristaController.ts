import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const motoristas = await prisma.motorista.findMany()

    res.status(200).json({
        motoristas
    });
});

export { listMotoristaController }