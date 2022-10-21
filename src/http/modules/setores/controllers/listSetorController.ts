import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSetorController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, limit } = req.query;

    const setores = await prisma.setor.findMany({
        skip: (Number(page) - 1) * Number(limit),  take: Number(limit),
    });
    
    res.status(200).json({
        setores
    });
});

export { listSetorController }