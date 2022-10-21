import { Motorista, PrismaClient } from "@prisma/client";
import motoristaDataSeed from "../data/motorista.data.seed";


export default async (prisma: PrismaClient) => {


    const vinculos = await prisma.vinculo.findMany();

    const motoristaSeed: Motorista[] | null = motoristaDataSeed.map(motorista => {
        const { vinculoNome, ...motoristaData } = motorista;

        const vinculo = vinculos.find(vinculo => vinculo.nome === vinculoNome);

        if (!vinculo)
            return null;

        return {
            ...motoristaData,
            data_nascimento: motorista.data_nascimento,
            vinculo_id: vinculo.id
        };
    }).filter(motorista => motorista !== null) as unknown as Motorista[];



    return await prisma.motorista.createMany({
        skipDuplicates: true,
        data: motoristaSeed
    });
}