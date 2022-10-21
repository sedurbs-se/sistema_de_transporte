import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, limit } = req.query;

    const motoristas = await prisma.motorista.findMany({
        skip: (Number(page) - 1) * Number(limit), take: Number(limit),
    })

    const count = await prisma.motorista.count();
    res.status(200).json({
        motoristas,
        count
    });
});

export { listMotoristaController }