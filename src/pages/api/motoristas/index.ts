import { Motorista } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from "../../../shared/prisma.index"

interface Response {
    motoristas: Motorista[];
}

type Error = {
    error: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response | Error>
) {
    try {
        const motoristas = await PrismaInstance.motorista.findMany();

        res.status(200).json({ motoristas });
    }

    catch (error: any) {
        res.status(500).json(error.message)
    }

}