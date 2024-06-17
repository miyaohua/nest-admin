/*
  Warnings:

  - Added the required column `introduce` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permission` ADD COLUMN `introduce` VARCHAR(191) NOT NULL;
