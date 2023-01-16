import { PrismaClient } from "@prisma/client";
import tipoFrotaDataSeed from "../data/tipo_frota.data.seed";


export default async (prisma: PrismaClient) => {
    return await prisma.tipoFrota.createMany({
        skipDuplicates: true,
        data: tipoFrotaDataSeed
    });
}