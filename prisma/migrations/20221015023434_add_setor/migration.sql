-- CreateTable
CREATE TABLE `Setor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `sigla` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `ramal` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Setor_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
