import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

const listVeiculoSemMovimentacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, limit } = req.query;

    const statusAtivo = await prisma.movimentacaoStatus.findFirst({
        where: {
            nome: 'SAIDA'
        }
    }
    );

    if(!statusAtivo) return res.status(400).json({ message: 'Status de movimentação não encontrado' });

    const veiculosQuery = await prisma.veiculo.findMany(
        {
            where: {
                Movimentacao: {
                    none: {
                        status_id: statusAtivo.id
                    }
                }
            },
            include: {
                tipoFrota: {
                    select: {
                        nome: true
                    }
                }
            },
            skip: (Number(page) - 1) * Number(limit), take: Number(limit),
        });

    const veiculos = veiculosQuery.map(veiculo => {
        return {
            ...veiculo,
            tipoFrota: veiculo.tipoFrota.nome
        }
    })

    res.status(200).json({
        veiculos
    });
});

export { listVeiculoSemMovimentacaoController }