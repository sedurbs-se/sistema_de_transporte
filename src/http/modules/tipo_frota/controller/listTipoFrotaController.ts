import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listTipoFrotaController = catchAsyncErrors(async (req: Request, res: Response) => {
    const tipos = await prisma.tipoFrota.findMany();

    res.status(200).json({
        tipos
    });
});

export { listTipoFrotaController }