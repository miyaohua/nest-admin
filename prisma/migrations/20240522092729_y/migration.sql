-- DropForeignKey
ALTER TABLE `Permission` DROP FOREIGN KEY `Permission_permissionGroupId_fkey`;

-- AlterTable
ALTER TABLE `Permission` MODIFY `permissionGroupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_permissionGroupId_fkey` FOREIGN KEY (`permissionGroupId`) REFERENCES `PermissionGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
