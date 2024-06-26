import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

const listVeiculoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { page, limit } = req.query;

    const veiculosQuery = await prisma.veiculo.findMany(
        {   
            where: {
                ativo: true
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

    const total = await prisma.veiculo.count();
    res.status(200).json({
        veiculos,
        total
    });
});

export { listVeiculoController }