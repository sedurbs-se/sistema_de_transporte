import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


const deleteVeiculoController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    await prisma.veiculo.update({
        where: {
            id: String(id)
        },
        data: {
            ativo: false
        }
    });

    res.status(200).send({});
});

export { deleteVeiculoController }
