import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const updateLocadoraController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const existLocadora = await prisma.locadora.findUnique({ where: { id: id as string } })

    if (!existLocadora) {
        throw new AppError('Locadora não encontrada', 400)
    }

    const { nome, telefone, sigla, bairro, endereco } = req.body;

    const locadora = await prisma.locadora.update({
        where: { id: id as string },
        data: {
            nome,
            telefone,
            sigla,
            bairro,
            endereco,
        }
    });

    res.status(200).json({ locadora });
});

export { updateLocadoraController }