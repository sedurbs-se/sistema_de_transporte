import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const getSetorController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const setor = await prisma.setor.findUnique({
        where: {
            id: id as string
        },
    });

    if(!setor) {
        throw new AppError('Setor não encontrado', 404)
    }

    res.status(200).json({
        setor
    });
});

export { getSetorController }