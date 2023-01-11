

import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "src/http/errors/AppError";
import { Request, Response } from "src/http/type";


// get one note from with a note id request dynamically
const updateUsuarioController = catchAsyncErrors(async (req: Request, res: Response) => {

    const responsavelTipo = await prisma.tipoUsuario.findUnique(
        {
            where: {
                id: req.user?.tipo_id as string
            }
        });


    if (responsavelTipo?.nome !== 'admin') {
        throw new AppError('Você não tem permissão para realizar essa ação', 401);
    }

    const { nome, login, password } = req.body;

    const existUser = await prisma.usuario.findUnique({ where: { login: login as string } });

    if (existUser) {
        throw new AppError('Usuário já cadastrado', 400);
    }

    await prisma.usuario.create({
        data: {
            nome,
            login,
            password,
        }
    });


    res.status(200).json({});
});


export { updateUsuarioController }