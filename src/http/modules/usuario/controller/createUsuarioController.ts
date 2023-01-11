

import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "src/http/errors/AppError";


// get one note from with a note id request dynamically
const createUsuarioController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {


    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400);
    }

    const responsavel = await prisma.usuario.findUnique({ where: { id: id as string } });

    if (!responsavel) {
        throw new AppError('Usuário responsável não encontrado', 400);
    }

    const { nome, login, password } = req.body;

    const existUser = await prisma.usuario.findUnique({ where: { login: login as string } });

    if (existUser) {
        throw new AppError('Usuário já cadastrado', 400);
    }

    const { id: tipo_id } = await prisma.tipoUsuario.upsert({
        where: {
            nome: 'colaborador'
        },
        create: {
            nome: 'colaborador'
        },
        update: {}
    });

    await prisma.usuario.create({
        data: {
            nome,
            login,
            password,
            tipo_id,
        }
    });


    res.status(200).json({});
});


export { createUsuarioController }