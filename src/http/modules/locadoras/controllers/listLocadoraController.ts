import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listLocadoraController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const locadoras = await prisma.locadora.findMany();

    res.status(200).json({
        locadoras
    });
});

export { listLocadoraController }