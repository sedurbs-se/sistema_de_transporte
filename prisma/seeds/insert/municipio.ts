import { PrismaClient } from "@prisma/client";
import municipioDataSeed from "../data/municipio.data.seed";

export default async (prisma: PrismaClient) => {
    return await prisma.municipio.createMany({
        skipDuplicates: true,
        data: municipioDataSeed
    });
}