import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, limit } = req.query;

    const motoristasQuery = await prisma.motorista.findMany({
        include: {
            vinculo: {
                select: {
                    nome: true
                }
            }
        },
        skip: (Number(page) - 1) * Number(limit), take: Number(limit),
    })

    const motoristas = motoristasQuery.map((motorista) => ({...motorista, vinculo: motorista.vinculo.nome}))


    const count = await prisma.motorista.count();
    res.status(200).json({
        motoristas,
        count
    });
});

export { listMotoristaController }