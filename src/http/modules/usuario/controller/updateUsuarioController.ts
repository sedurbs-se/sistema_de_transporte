

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

    const { id } = req.query;

    if (!id) {
        throw new AppError('Usuário não encontrado', 400);
    }


    const existUser = await prisma.usuario.findUnique({ where: { id: id as string } });

    if (!existUser) {
        throw new AppError('Usuário não cadastrado', 400);
    }

    const { nome, login, password } = req.body;

    const usedLogin = await prisma.usuario.findUnique({ where: { login } });

    if (usedLogin && usedLogin.id !== id) {
        throw new AppError('Login já cadastrado', 400);
    };
    
    const user = await prisma.usuario.update({
        where: {
            id: id as string
        },
        data: {
            nome, login, password
        },
        select: {
            id: true,
            nome: true,
            login: true,
            tipo: {
                select: {
                    nome: true
                }
            }
        }
    });

    res.status(200).json({ user });
});


export { updateUsuarioController }