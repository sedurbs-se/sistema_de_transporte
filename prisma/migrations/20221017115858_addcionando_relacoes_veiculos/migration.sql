/*
  Warnings:

  - Added the required column `locadora_id` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setor_id` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_frota_id` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `veiculo` ADD COLUMN `locadora_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `setor_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipo_frota_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TipoFrota` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoFrota_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_tipo_frota_id_fkey` FOREIGN KEY (`tipo_frota_id`) REFERENCES `TipoFrota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_locadora_id_fkey` FOREIGN KEY (`locadora_id`) REFERENCES `Locadora`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_setor_id_fkey` FOREIGN KEY (`setor_id`) REFERENCES `Setor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
