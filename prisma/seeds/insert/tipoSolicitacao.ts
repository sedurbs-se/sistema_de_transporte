import { PrismaClient } from "@prisma/client";
import tipoSolicitacaoDataSeed from "../data/tipoSolicitacao.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.tipoSolicitacao.createMany({
        skipDuplicates: true,
        data: tipoSolicitacaoDataSeed
    });
}