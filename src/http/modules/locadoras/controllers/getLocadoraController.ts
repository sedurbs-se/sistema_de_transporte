import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const getLocadoraController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const locadora = await prisma.locadora.findUnique({
        where: {
            id: id as string
        },
    });

    if(!locadora) {
        throw new AppError('Locadora não encontrada', 404)
    }

    res.status(200).json({
        locadora
    });
});

export { getLocadoraController }