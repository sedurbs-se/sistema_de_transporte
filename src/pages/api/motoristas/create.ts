import { Motorista } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from "../../../shared/prisma.index"

interface Response {
    motorista: Motorista;
}

type Error = {
    error: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response | Error>
) {

    const { nome,
        celular,
        telefone,
        data_nascimento,
        bairro,
        endereco,
        vinculo, } = req.body;

    try {
        const motorista = await PrismaInstance.motorista.create({
            data: {
                nome,
                celular,
                telefone,
                data_nascimento:new Date(data_nascimento),
                bairro,
                endereco,
                // vinculo,
            }
        });

        res.status(200).json({ motorista });
    }

    catch (error: any) {
        res.status(500).json(error.message)
    }

}