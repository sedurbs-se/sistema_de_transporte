import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const vinculos = await prisma.vinculo.createMany({
        skipDuplicates: true,
        data: [
            { nome: 'Efetivo' },
            { nome: 'Comissionado' },
            { nome: 'Terceirizado' },
            { nome: 'Afastado' },
        ]
    })

    const tipo_frotas = await prisma.tipoFrota.createMany({
        skipDuplicates: true,
        data: [

            { nome: 'TITULAR' },
            { nome: 'REVERSA' },
            { nome: 'DEVOLUÇÃO' },
            { nome: 'MANUTENÇÃO' },
        ]
    });

    const status_solicitacao = await prisma.statusSolicitacao.createMany({
        skipDuplicates: true,
        data: [
            { nome: 'ESPERA' },
            { nome: 'CANCELADO' },
            { nome: 'AUTORIZADO' },
            { nome: 'SEM CARRO' },
        ]
    });

    const tipo_solicitacao = await prisma.tipoSolicitacao.createMany({
        skipDuplicates: true,
        data: [
            { nome: 'FISCALIZAÇÂO' },
            { nome: 'VIAGEM' },
            { nome: 'REUNIÃO' },
            { nome: 'ENTREGAR DOC.' },
            { nome: 'EVENTO' },
            { nome: 'SERVIÇO BANCARIO' },
            { nome: 'MANUTENÇÂO' },
            { nome: 'ALMOÇO' },
            { nome: 'PLANTÂO' },
            { nome: 'DIVERSOS' },
        ]
    });


    console.log({ vinculos, tipo_frotas, status_solicitacao, tipo_solicitacao })
}
main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

