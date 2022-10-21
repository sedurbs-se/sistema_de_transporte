import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import { getFormatedDateString, getFormatedDateTimeString } from "@shared/utils/dateUtils";


// get one note from with a note id request dynamically
const getMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const motorista = await prisma.motorista.findUnique({
        where: {
            id: id as string
        },
        include: {
            vinculo: {
                select: {
                    nome:true
                }
            }
        }
    });


    

    if(!motorista) {
        throw new AppError('Motorista não encontrado', 404)
    }
    
    res.status(200).json({
        motorista: {...motorista, 
        vinculo: motorista.vinculo.nome,
        data_nascimento: getFormatedDateString(motorista.data_nascimento),
        createdAt: getFormatedDateTimeString(motorista.createdAt),
        updatedAt: getFormatedDateTimeString(motorista.updatedAt)}
    });
});

export { getMotoristaController }