import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSetorController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { page, limit } = req.query;

    const setores = !isNaN(Number(limit)) ? await prisma.setor.findMany({
        skip: (Number(page) - 1) * Number(limit),  take: Number(limit),
    }): await prisma.setor.findMany({
        skip: Number(page) - 1
    });
    
    res.status(200).json({
        setores
    });
});

export { listSetorController }