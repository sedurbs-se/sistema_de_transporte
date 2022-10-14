-- CreateTable
CREATE TABLE `Veiculo` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `componentes` VARCHAR(191) NOT NULL,
    `quilometragemInicial` VARCHAR(191) NOT NULL,
    `quilometragemAtual` VARCHAR(191) NOT NULL,
    `observacao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
