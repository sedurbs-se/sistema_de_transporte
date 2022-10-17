import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSetorController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const setores = await prisma.setor.findMany();

    res.status(200).json({
        setores
    });
});

export { listSetorController }