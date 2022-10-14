import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


const deleteVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    await prisma.veiculo.delete({ where: { id: id as string } })

    res.status(200).send({});
});

export { deleteVeiculoController }
