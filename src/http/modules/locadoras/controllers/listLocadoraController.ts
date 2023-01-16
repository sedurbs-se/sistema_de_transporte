import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listLocadoraController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { page, limit } = req.query;


    const locadoras = !isNaN(Number(limit)) ? await prisma.locadora.findMany({
        skip: (Number(page) - 1) * Number(limit),  take: Number(limit),
    }) : await prisma.locadora.findMany({
        skip: Number(page) - 1
    })

    const total = await prisma.locadora.count();

    res.status(200).json({
        locadoras,
        total
    });
});

export { listLocadoraController }