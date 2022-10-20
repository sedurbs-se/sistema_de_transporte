import { PrismaClient, Veiculo } from "@prisma/client";
import veiculoDataSeed from "../data/veiculo.data.seed";


export default async (prisma: PrismaClient) => {

    const setores = await prisma.setor.findMany();
    const locadoras = await prisma.locadora.findMany();
    const tipoFrota = await prisma.tipoFrota.findMany();



    const veiculoSeed: Veiculo[] | null = veiculoDataSeed.map(veiculo => {

        const { setorNome, locadoraNome, tipoFrotaNome, ...veiculoData } = veiculo;

        const setor = setores.find(setor => setor.nome === setorNome);

        const locadora = locadoras.find(locadora => locadora.nome === locadoraNome);

        const tipo = tipoFrota.find(tipo => tipo.nome === tipoFrotaNome);

        if (!setor || !locadora || !tipo)
            return null;

        return {
            ...veiculoData,
            setor_id: setor.id,
            locadora_id: locadora.id,
            tipo_frota_id: tipo.id
        };

    }).filter(veiculo => veiculo !== null) as unknown as Veiculo[];
    

    return await prisma.veiculo.createMany({
        skipDuplicates: true,
        data: veiculoSeed
    });
}