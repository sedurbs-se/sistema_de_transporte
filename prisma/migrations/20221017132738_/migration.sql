/*
  Warnings:

  - You are about to drop the column `vinculo_id` on the `motorista` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `motorista` DROP FOREIGN KEY `Motorista_vinculo_id_fkey`;

-- AlterTable
ALTER TABLE `motorista` DROP COLUMN `vinculo_id`;
