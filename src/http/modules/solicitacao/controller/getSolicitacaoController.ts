import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import 'dayjs/locale/pt-br'
import {  getFormatedDateTimeString } from "@shared/utils/dateUtils";


// get one note from with a note id request dynamically
const getSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    }

    const solicitacao = await prisma.solicitacao.findUnique({
        where: {
            id: id as string
        },
        include: {
            MunicipioSolicitacao: true,
            tipoSolicitacao: true,
            setor: true,
            statusSolicitacao: true
        }
    });


    if (!solicitacao) {
        throw new AppError('Solicitacao não encontrada', 404)
    }

    res.status(200).json({
        motorista: {
            ...solicitacao,
            createdAt: getFormatedDateTimeString(solicitacao.createdAt),
            updatedAt: getFormatedDateTimeString(solicitacao.updatedAt)
        }
    });
});

export { getSolicitacaoController }