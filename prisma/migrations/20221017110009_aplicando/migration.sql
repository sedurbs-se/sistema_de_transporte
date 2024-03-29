-- CreateTable
CREATE TABLE `Solicitacao` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ramal` VARCHAR(191) NOT NULL,
    `atividade` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `num_ocupantes` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `observacao` VARCHAR(191) NOT NULL,
    `setor` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
