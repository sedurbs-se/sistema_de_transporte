import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import { ICreateSolicitacaoDTO } from "@domain/query/createSolicitacao";


const createSolicitacaoController = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        usuario,
        ramal,
        num_ocupantes,
        atividade,
        data_hora_saida,
        tipo_solicitacao,
        status_solicitacao,
        setor,
        municipios,
        observacao,
    } = req.body as ICreateSolicitacaoDTO["params"];

    const solicitacao = await prisma.solicitacao.create({
        data : {
            usuario,
            ramal,
            num_ocupantes,
            data_hora_saida,
            atividade,
            tipo_solicitacao_id:tipo_solicitacao,
            status_solicitacao_id:status_solicitacao,
            setor_id:setor,
            municipios,
            observacao,
        }
    })

});

export { createSolicitacaoController }