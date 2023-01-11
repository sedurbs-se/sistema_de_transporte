

import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listTipoSolicitacaoController = catchAsyncErrors(async (req: Request, res: Response) => {
    const tiposSolicitacoes = await prisma.tipoSolicitacao.findMany();

    
    res.status(200).json({
        tiposSolicitacoes
    });
});

export { listTipoSolicitacaoController }