import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listSetorController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { page, limit, nome } = req.query;

    const setorNome = nome ? String(nome) : "";

    const setores = await prisma.setor.findMany({
        where: {
            sigla: {
                contains: setorNome.toUpperCase(),
            }
        },
        skip: (Number(page) - 1) * Number(limit),  take: Number(limit),
    })

    const total = await prisma.setor.count();
    
    res.status(200).json({
        setores,
        total
    });
});

export { listSetorController }