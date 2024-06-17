/*
  Warnings:

  - A unique constraint covering the columns `[roleId,permissionId]` on the table `RolePermission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `introduction` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permission` ADD COLUMN `introduction` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RolePermission_roleId_permissionId_key` ON `RolePermission`(`roleId`, `permissionId`);
