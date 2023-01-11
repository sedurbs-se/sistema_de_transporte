import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "src/http/errors/AppError";


// get one note from with a note id request dynamically
const resetUsuarioController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400);
    }

    const responsavel = await prisma.usuario.findUnique({ where: { id: id as string } });

    if (!responsavel) {
        throw new AppError('Usuário responsável não encontrado', 400);
    }

});

export default resetUsuarioController;