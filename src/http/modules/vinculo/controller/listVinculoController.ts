import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

// get one note from with a note id request dynamically
const listVinculoController = catchAsyncErrors(async (req: Request, res: Response) => {
    
    
    const vinculos = await prisma.vinculo.findMany({
            where: {
                    nome: {
                        in: ["EFETIVO", "TERCEIRIZADO", "COMISSIONADO", "AFASTADO"]
                    }
            }
        }
    );
    res.status(200).json({
        vinculos
    });
});

export { listVinculoController }