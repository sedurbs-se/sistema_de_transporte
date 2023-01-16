import { PrismaClient } from "@prisma/client";
import tipoUsuarioDataSeed from "../data/tipo_usuario.seed";

export default async (prisma: PrismaClient) => {
    return await prisma.tipoUsuario.createMany({
        skipDuplicates: true,
        data: tipoUsuarioDataSeed
    });
}