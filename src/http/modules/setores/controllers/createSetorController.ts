import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const createSetorController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    const { 
        codigo,
        nome,
        sigla,
        responsavel,
        ramal, 
    } = req.body;

    const setorJaCadastardo = await prisma.setor.findUnique({
        where: {
            codigo
        }
    })

    if(setorJaCadastardo) {
        return res.status(409).json({msg: "Setor já cadastrado"})
    }

    const setor = await prisma.setor.create({
        data: {
            codigo,
            nome,
            sigla,
            responsavel,
            ramal,
        }
    });

    res.status(200).json({ setor });
});

export { createSetorController }