



import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

import { Request, Response } from "src/http/type";


// get one note from with a note id request dynamically
const tiposUsuarioController = catchAsyncErrors(async (req: Request, res: Response) => {

    const tiposUsuario = await prisma.tipoUsuario.findMany({
        where:{
            nome: {
                not: 'admin'
            }
        },
        select: {
            id: true,
            nome: true,
            }
        }
    );

    res.status(200).json({tiposUsuario});
});


export { tiposUsuarioController }