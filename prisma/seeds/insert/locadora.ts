import { PrismaClient } from "@prisma/client";
import locadoraDataSeed from "../data/locadora.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.locadora.createMany({
        skipDuplicates: true,
        data: locadoraDataSeed
    });
}