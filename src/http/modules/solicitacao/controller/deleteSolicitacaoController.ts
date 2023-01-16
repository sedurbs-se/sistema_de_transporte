import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";

// get one note from with a note id request dynamically
const deleteSolicitacaoController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { id } = req.query;

    if (!id) {
        throw new AppError('Id não informado', 400)
    };

    const existSolicitacao = await prisma.solicitacao.findUnique({ where: { id: id as string } })

    if (!existSolicitacao) {
        throw new AppError('Solicitação não encontrada', 400)
    }

    // Deleta todos os municipios da solicitacao
    await prisma.municipiosolicitacao.deleteMany({
        where: {
            solicitacao_id: id as string
        }
    });
    await prisma.solicitacao.delete({ where: { id: id as string } })

    res.status(202).send({});
});

export { deleteSolicitacaoController }
