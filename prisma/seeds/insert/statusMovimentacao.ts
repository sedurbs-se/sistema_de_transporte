import { PrismaClient } from "@prisma/client";
import statusMovimentacaoDataSeed from "../data/statusMovimentacao.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.movimentacaoStatus.createMany({
        skipDuplicates: true,
        data: statusMovimentacaoDataSeed
    });
}