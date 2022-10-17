import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

// get one note from with a note id request dynamically
const listVinculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    
    const vinculos = await prisma.vinculo.findMany();
    res.status(200).json({
        vinculos
    });
});

export { listVinculoController }