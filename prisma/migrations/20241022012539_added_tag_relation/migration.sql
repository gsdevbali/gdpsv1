/*
  Warnings:

  - You are about to drop the column `tagId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `TransactionMain` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionMain` DROP FOREIGN KEY `TransactionMain_tagId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `tagId`;

-- AlterTable
ALTER TABLE `TransactionMain` DROP COLUMN `tagId`,
    ADD COLUMN `ref` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `TransactionMainTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionMainId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    UNIQUE INDEX `TransactionMainTag_transactionMainId_tagId_key`(`transactionMainId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    UNIQUE INDEX `TransactionTag_transactionId_tagId_key`(`transactionId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionMainTag` ADD CONSTRAINT `TransactionMainTag_transactionMainId_fkey` FOREIGN KEY (`transactionMainId`) REFERENCES `TransactionMain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionMainTag` ADD CONSTRAINT `TransactionMainTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionTag` ADD CONSTRAINT `TransactionTag_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionTag` ADD CONSTRAINT `TransactionTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
