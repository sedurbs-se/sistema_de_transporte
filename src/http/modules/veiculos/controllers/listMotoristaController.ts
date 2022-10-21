import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

const listVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const veiculosQuery = await prisma.veiculo.findMany(
        {
            include:{
                tipoFrota: {
                    select: {
                        nome:true
                    }
                }
            }
});

    const veiculos = veiculosQuery.map(veiculo => {
        return {
            ...veiculo,
            tipoFrota: veiculo.tipoFrota.nome
        }
    })

    res.status(200).json({
        veiculos
    });
});

export { listVeiculoController }