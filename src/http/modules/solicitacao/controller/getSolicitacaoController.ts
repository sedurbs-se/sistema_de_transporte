import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import 'dayjs/locale/pt-br'
import { getFormatedDateTimeString } from "@shared/utils/dateUtils";


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
            municipiosolicitacao: true,
            tiposolicitacao: true,
            setor: true,
            statussolicitacao: true,
        }
    });

    const municiopiosId = solicitacao?.municipiosolicitacao.map(municipio => municipio.id);

    const municipios = await prisma.municipio.findMany({
        where: {
            id: {
                in: municiopiosId
            }
        }
    });


    if (!solicitacao) {
        throw new AppError('Solicitacao não encontrada', 404)
    }

    res.status(200).json({
        solicitacao: {
            ...solicitacao,
            municipios,
            createdAt: getFormatedDateTimeString(solicitacao.createdAt),
            updatedAt: getFormatedDateTimeString(solicitacao.updatedAt)
        }
    });
});

export { getSolicitacaoController }