-- AlterTable
ALTER TABLE `motorista` ADD COLUMN `vinculo_id` VARCHAR(191) NOT NULL DEFAULT '1';

-- CreateTable
CREATE TABLE `Vinculo` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Motorista` ADD CONSTRAINT `Motorista_vinculo_id_fkey` FOREIGN KEY (`vinculo_id`) REFERENCES `Vinculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
