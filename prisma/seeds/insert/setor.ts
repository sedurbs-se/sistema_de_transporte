import { PrismaClient } from "@prisma/client";
import setorDataSeed from "../data/setor.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.setor.createMany({
        skipDuplicates: true,
        data: setorDataSeed
    });
}