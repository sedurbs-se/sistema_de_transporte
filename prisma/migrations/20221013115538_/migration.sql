/*
  Warnings:

  - Made the column `nome` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `nome` VARCHAR(191) NOT NULL;
