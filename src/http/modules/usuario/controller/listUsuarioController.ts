

import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "src/http/errors/AppError";
import { Request, Response } from "src/http/type";


// get one note from with a note id request dynamically
const listUsuarioController = catchAsyncErrors(async (req: Request, res: Response) => {

    // const {id} = req.query;

    // if(!id) throw new AppError('Usuário não encontrado', 404);

    const usuarios = await prisma.usuario.findMany({
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

    res.status(200).json({usuarios});
});


export { listUsuarioController }