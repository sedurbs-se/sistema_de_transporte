import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from '../../../shared/prisma.index';
import { sign } from 'jsonwebtoken';


interface Response {
    token: string;
}

type Error = {
    error: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response | Error>
) {

    const { login, password } = req.body;

    try {
        const user = await PrismaInstance.usuario.findFirst({
            where: {
                login: login,
                password: password
            },
            select: {
                id: true,
                nome: true,
                login: true
            }
        })

        if (user) {
            const token = sign({
                user
            }, "sistema_transporte", {
                expiresIn: "1d"
            });

            res.status(200).json({ token })
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    } catch (error: any) {
        res.status(500).json(error.message)
    }

}