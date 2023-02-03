import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";


// get one note from with a note id request dynamically
const listMotoristaController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { page, limit, nome } = req.query;

    const motoristaNome = nome ? String(nome) : "";

    const motoristas = await prisma.motorista.findMany({
        where: {
            vinculo: {
                nome: {
                    in: ["EFETIVO", "TERCEIRIZADO", "COMISSIONADO"]
                }
            },
            nome : {
                contains: motoristaNome 
            },
            
        },
        include: {
            vinculo: {
                select: {
                    nome: true
                },
            }
        },
        skip: (Number(page) - 1) * Number(limit), 
        take: Number(limit),
    })


    const mappedMotoristas = motoristas.map(motorista => {
        return {
            ...motorista,
            vinculo: motorista.vinculo.nome
        }
    })


    const total = await prisma.motorista.count({
        where: {
            vinculo: {
                nome: {
                    in: ["EFETIVO", "TERCEIRIZADO", "COMISSIONADO"]
                }
            },
        }
    });
    res.status(200).json({
        motoristas: mappedMotoristas,
        total
    });
});

export { listMotoristaController }