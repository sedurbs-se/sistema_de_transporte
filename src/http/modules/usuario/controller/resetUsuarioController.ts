import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "src/http/errors/AppError";


// get one note from with a note id request dynamically
const resetUsuarioController = catchAsyncErrors(async (req: Request, res: Response) => {

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

    if(!id) {
        throw new AppError('Usuário não encontrado', 404);
    }

    const existUser = await prisma.usuario.findUnique({ where: { id: id as string } });

    if (!existUser) {
        throw new AppError("Usuário não encontrado", 404);
    }

    await prisma.usuario.update({
        where: {
            id: id as string
        },
        data: {
            password: 'abcd1234'
        }
    })

    res.status(200).json({});
});

export default resetUsuarioController;