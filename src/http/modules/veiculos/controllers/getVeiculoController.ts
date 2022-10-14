import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

const getVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const veiculo = await prisma.veiculo.findUnique({
        where: {
            id: id as string
        },
    });

    res.status(200).json({
        veiculo
    });
});

export { getVeiculoController }