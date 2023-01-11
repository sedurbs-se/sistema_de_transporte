import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

// get one note from with a note id request dynamically
const deleteLocadoraController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    await prisma.locadora.delete({ where: { id: id as string } })

    res.status(200).send({});
});

export { deleteLocadoraController }
