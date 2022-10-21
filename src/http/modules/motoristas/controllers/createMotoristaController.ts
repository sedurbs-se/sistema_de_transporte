import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import { Motorista } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"
import { getFormatedDateFromString } from "@shared/utils/dateUtils";


// get one note from with a note id request dynamically
const createMotoristaController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { nome,
        celular,
        telefone,
        data_nascimento,
        bairro,
        endereco,
        vinculo_id, 
    } = req.body;

    console.log('CREATE MOTORISTA', req.body)


    const motorista = await prisma.motorista.create({
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
        },
    });

    res.status(200).json({ motorista });
});

export { createMotoristaController }