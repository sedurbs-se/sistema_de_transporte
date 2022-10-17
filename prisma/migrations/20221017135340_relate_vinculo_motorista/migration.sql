/*
  Warnings:

  - Added the required column `vinculo_id` to the `Motorista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motorista` ADD COLUMN `vinculo_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Motorista` ADD CONSTRAINT `Motorista_vinculo_id_fkey` FOREIGN KEY (`vinculo_id`) REFERENCES `Vinculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
