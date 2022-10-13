

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Veiculos } from '../../shared/types/Veiculos'

type Data = {
    veiculos: Veiculos[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {

    const veiculos = []

    for (let i = 0; i < 10; i++) {
        veiculos.push({
            id: `ab ${i}`,
            placa: `ab ${i}c123`,
            descricao: `Ca ${i}rro`,
            quilometragem: 1000,
        })
    }

    res.status(200).send({ veiculos })
}