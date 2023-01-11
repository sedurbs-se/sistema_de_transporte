import { Usuario } from "@shared/types/Usuario";
import { decode } from "jsonwebtoken";
import AppError from "../errors/AppError";
import prisma from "@shared/prisma.index";
import { Request, Response } from "../type";

export default async function verifyAuthentication(
    req: Request,
    res: Response,
    next: () => void,
) {

    const { authorization } = req.headers;
    console.log("caiu aqui")
    if (!authorization) {
        throw new AppError('Token not provided', 401);
    }

    const token = authorization.replace('Bearer', '').trim();

    if (!token) {
        throw new AppError('Token not provided', 401);
    }

    console.log(authorization)

    const { user } = decode(token) as { user: Usuario };

    if (!user) {
        throw new AppError('Invalid token', 401);
    }

    const existUser = await prisma.usuario.findUnique({ where: { id: user.id } });

    if (!existUser) {
        throw new AppError('Invalid token', 401);
    };

    req.user = user;

    next();
}