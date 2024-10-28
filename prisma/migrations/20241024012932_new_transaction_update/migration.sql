-- CreateTable
CREATE TABLE `TransactionAllTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionAllId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    UNIQUE INDEX `TransactionAllTag_transactionAllId_tagId_key`(`transactionAllId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionAll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `ref` VARCHAR(191) NOT NULL DEFAULT '',
    `mediaPath` VARCHAR(191) NOT NULL DEFAULT '',
    `debit` DOUBLE NOT NULL DEFAULT 0,
    `credit` DOUBLE NOT NULL DEFAULT 0,
    `accountId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Transaction_accountId_fkey`(`accountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionAllTag` ADD CONSTRAINT `TransactionAllTag_transactionAllId_fkey` FOREIGN KEY (`transactionAllId`) REFERENCES `TransactionAll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionAllTag` ADD CONSTRAINT `TransactionAllTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionAll` ADD CONSTRAINT `TransactionAll_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
