import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const createLocadoraController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { nome,
        sigla,
        endereco,
        bairro,
        telefone, } = req.body;


    const locadora = await prisma.locadora.create({
        data: {
            nome,
            sigla,
            telefone,
            bairro,
            endereco,
        }
    });

    res.status(200).json({ locadora });
});

export { createLocadoraController }