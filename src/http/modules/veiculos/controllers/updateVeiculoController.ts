import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";


// get one note from with a note id request dynamically
const updateVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const existVeiculo = await prisma.veiculo.findUnique({ where: { id: id as string } })

    if (!existVeiculo) {
        throw new AppError('Veiculo não encontrado', 400)
    }

    const { 
        nome, 
        placa, 
        quilometragemAtual, 
        quilometragemInicial, 
        tipo_frota_id, 
        locadora_id,
        setor_id,
        componentes,
        observacao
         } = req.body;

    const veiculo = await prisma.veiculo.update({
        where: { id: id as string },
        data: {
            nome,
            placa, 
            quilometragemAtual, 
            quilometragemInicial, 
            tipo_frota_id, 
            locadora_id,
            setor_id,
            componentes,
            observacao
        }
    });

    res.status(200).json({ veiculo });
});

export { updateVeiculoController }