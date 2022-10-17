import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const vinculos = await prisma.vinculo.createMany({
        data: [
            { nome: 'Efetivo' },
            { nome: 'Comissionado' },
            { nome: 'Terceirizado' },
            { nome: 'Afastado' },
        ]
    })

    const tipo_frotas = await prisma.tipoFrota.createMany({
        data: [
            { nome: 'TITULAR' },
            { nome: 'REVERSA' },
            { nome: 'DEVOLUÇÃO' },
            { nome: 'MANUTENÇÃO' },
        ]
    });

    console.log({ vinculos, tipo_frotas })
}
main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

