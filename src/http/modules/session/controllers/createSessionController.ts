import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";
import AppError from "../../../errors/AppError";
import { sign } from "jsonwebtoken";


const createSessionController = catchAsyncErrors(async (req: Request, res: Response) => {

    const { login, password } = req.body;

    const user = await prisma.usuario.findFirst({
        where: {
            login: login,
            password: password
        },
        select: {
            id: true,
            nome: true,
            login: true,
            tipo: true
        }
    })

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = sign({
        user
    }, "sistema_transporte", {
        expiresIn: "1d"
    });

    res.status(200).json({ token })
});

export { createSessionController }