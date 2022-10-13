/*
  Warnings:

  - You are about to drop the column `data_nascmento` on the `motorista` table. All the data in the column will be lost.
  - Added the required column `data_nascimento` to the `Motorista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motorista` DROP COLUMN `data_nascmento`,
    ADD COLUMN `data_nascimento` DATETIME(3) NOT NULL;
