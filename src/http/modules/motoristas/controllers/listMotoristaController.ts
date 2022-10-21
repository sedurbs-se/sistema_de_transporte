import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const motoristasQuery = await prisma.motorista.findMany({
        include: {
            vinculo: {
                select: {
                    nome:true
                }
            }
        }
    })

    const motoristas = motoristasQuery.map((motorista) => (
        {...motorista, vinculo: motorista.vinculo.nome}
    ))

    res.status(200).json({
        motoristas
    });
});

export { listMotoristaController }