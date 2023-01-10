import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

const listMotoristaSemMovimentacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, limit } = req.query;

    const statusAtivo = await prisma.movimentacaoStatus.findFirst({
        where: {
            nome: 'SAIDA'
        }
    }
    );

    if (!statusAtivo) return res.status(400).json({ message: 'Status de movimentação não encontrado' });

    const motoristas = await prisma.motorista.findMany({
        where: {
            vinculo: {
                nome: {
                    in: ["EFETIVO", "TERCEIRIZADO"]
                }
            }
        },
        include: {
            vinculo: {

                select: {
                    nome: true,

                },
            }
        }
    })


    const mappedMotoristas = motoristas.map(motorista => {
        return {
            ...motorista,
            vinculo: motorista.vinculo.nome
        }
    })


    // const count = await prisma.motorista.count();
    res.status(200).json({
        motoristas: mappedMotoristas,
        // count: Math.ceil(count / Number(limit))
    });
});

export { listMotoristaSemMovimentacaoController }