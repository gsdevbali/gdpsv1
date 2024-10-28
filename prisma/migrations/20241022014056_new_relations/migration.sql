/*
  Warnings:

  - Added the required column `accountId` to the `TransactionMain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionMain` ADD COLUMN `accountId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `TransactionMain_accountId_fkey` ON `TransactionMain`(`accountId`);

-- AddForeignKey
ALTER TABLE `TransactionMain` ADD CONSTRAINT `TransactionMain_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
