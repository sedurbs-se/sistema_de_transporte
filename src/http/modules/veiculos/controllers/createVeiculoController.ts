import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

const createVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        placa,
        descricao,
        componentes,
        quilometragemInicial,
        quilometragemAtual,
        tipo_de_frota_id,
        locadora_id,
        setor_id,
        observacao,


     } = req.body;

    const motorista = await prisma.veiculo.create({
        data: {
            placa,
            descricao,
            componentes,
            quilometragemInicial,
            quilometragemAtual,
            // tipo_de_frota_id,
            // locadora_id,
            // setor_id,
            observacao,
        }
    });

    res.status(200).json({ motorista });
});

export { createVeiculoController }