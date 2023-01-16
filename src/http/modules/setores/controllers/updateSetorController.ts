import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const updateSetorController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const existSetor = await prisma.setor.findUnique({ where: { id: id as string } })

    if (!existSetor) {
        throw new AppError('Setor não encontrado', 400)
    }

    const { nome, codigo, sigla, responsavel, ramal } = req.body;

    const setor = await prisma.setor.update({
        where: { id: id as string },
        data: {
            nome,
            codigo,
            sigla,
            responsavel,
            ramal,
        }
    });

    res.status(200).json({ setor });
});

export { updateSetorController }