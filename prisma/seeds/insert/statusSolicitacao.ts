import { PrismaClient } from "@prisma/client";
import statusSolicitacaoDataSeed from "../data/statusSolicitacao.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.statusSolicitacao.createMany({
        skipDuplicates: true,
        data: statusSolicitacaoDataSeed
    });
}