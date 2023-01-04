import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import { getFormatedDateFromString } from "@shared/utils/dateUtils";


// get one note from with a note id request dynamically
const updateMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const existMotorista = await prisma.motorista.findUnique({ where: { id: id as string } })

    if (!existMotorista) {
        throw new AppError('Motorista não encontrado', 400)
    }

    const { nome, celular, telefone, data_nascimento, bairro, endereco, vinculo_id } = req.body;

    
    const motorista = await prisma.motorista.update({
        where: { id: id as string },
        data: {
            nome,
            celular,
            telefone,
            data_nascimento: getFormatedDateFromString(data_nascimento),
            bairro,
            endereco,
            vinculo:{
                connect:{id:vinculo_id}
            }
        }
    });

    res.status(200).json({ motorista });
});

export { updateMotoristaController }