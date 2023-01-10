import { PrismaClient } from '@prisma/client';
import vinculos from './seeds/insert/vinculo';
import municipios from './seeds/insert/municipio';
import locadora from './seeds/insert/locadora';
import tipoFrota from './seeds/insert/tipoFrota';
import statusSolicitacao from './seeds/insert/statusSolicitacao';
import statusMovimentacao from './seeds/insert/statusMovimentacao';
import tipoSolicitacao from './seeds/insert/tipoSolicitacao';
import setor from './seeds/insert/setor';
import veiculo from './seeds/insert/veiculo';
import motorista from './seeds/insert/motorista';

const prisma = new PrismaClient()

async function main() {

    await vinculos(prisma);

    await municipios(prisma);

    await locadora(prisma);

    await tipoFrota(prisma);

    await setor(prisma);

    await statusSolicitacao(prisma);

    await tipoSolicitacao(prisma);

    await veiculo(prisma);

    await motorista(prisma);

    await statusMovimentacao(prisma)

}

main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

