import { PrismaClient } from "@prisma/client";
import vinculoDataSeed from "../data/vinculo.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.vinculo.createMany({
        skipDuplicates: true,
        data: vinculoDataSeed
    });
}