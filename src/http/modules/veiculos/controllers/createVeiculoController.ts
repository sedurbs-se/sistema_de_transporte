import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

const createVeiculoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        placa,
        nome,
        componentes,
        quilometragemInicial,
        quilometragemAtual,
        tipo_frota_id,
        locadora_id,
        setor_id,
        observacao,


    } = req.body;


    // Não pode criar veiculos com mesma placa

    const existVeiculos = await prisma.veiculo.findFirst({
        where: {
            placa
        }
    });

    if (existVeiculos) {
        throw new AppError('Veiculo já existe', 400)
    };

    // Quilometragem inicial não pode ser menor que a quilometragem atual

    if (quilometragemInicial < quilometragemAtual) {
        throw new AppError('Quilometragem inicial não pode ser menor que a quilometragem atual', 400)
    }

    const veiculo = await prisma.veiculo.create({
        data: {
            placa,
            nome,
            componentes,
            quilometragemInicial: parseFloat(quilometragemInicial),
            quilometragemAtual: parseFloat(quilometragemAtual),
            tipo_frota_id,
            locadora_id,
            setor_id,
            observacao,
        }
    });

    res.status(200).json({ veiculo });
});

export { createVeiculoController }