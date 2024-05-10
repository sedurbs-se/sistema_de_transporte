import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

// get one note from with a note id request dynamically
const deleteMotoristaController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    await prisma.motorista.update({ 
        where: { id: id as string },
        data: {
            vinculo: {
                connect: {
                    id: '3cc7d034-ff64-4dfe-9605-0a3c8746ed87'
                }
            }
        }
    });

    res.status(200).send({});
});

export { deleteMotoristaController }
