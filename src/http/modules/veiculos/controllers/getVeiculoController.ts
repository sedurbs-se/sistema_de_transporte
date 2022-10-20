import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

const getVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const veiculoQuery = await prisma.veiculo.findUnique({
        where: {
            id: id as string
        },
        include:{
            tipoFrota:true
        }
    });

    


    const veiculo = {...veiculoQuery, tipoFrota: veiculoQuery!.tipoFrota.nome}


    res.status(200).json({
        veiculo
    });
});

export { getVeiculoController }