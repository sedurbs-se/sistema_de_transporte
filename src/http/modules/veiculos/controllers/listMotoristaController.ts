import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

const listVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const veiculos = await prisma.veiculo.findMany()

    res.status(200).json({
        veiculos
    });
});

export { listVeiculoController }