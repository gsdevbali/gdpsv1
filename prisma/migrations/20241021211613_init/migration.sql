-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(16) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `accountTypeId` INTEGER NOT NULL,
    `accountGroupId` INTEGER NOT NULL,
    `accountGroup2Id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_code_key`(`code`),
    INDEX `Account_accountGroup2Id_fkey`(`accountGroup2Id`),
    INDEX `Account_accountGroupId_fkey`(`accountGroupId`),
    INDEX `Account_accountTypeId_fkey`(`accountTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flag` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AccountType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `flag` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AccountGroup_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountGroup2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `flag` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AccountGroup2_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionMain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
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
    `transactionId` INTEGER NOT NULL,

    INDEX `Transaction_accountId_fkey`(`accountId`),
    INDEX `Transaction_transactionId_fkey`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `journalEntryId` INTEGER NOT NULL,
    `accountId` INTEGER NOT NULL,
    `ref` VARCHAR(191) NOT NULL DEFAULT '',
    `mediaPath` VARCHAR(191) NOT NULL DEFAULT '',
    `debit` DOUBLE NOT NULL DEFAULT 0,
    `credit` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `JournalDetail_accountId_fkey`(`accountId`),
    INDEX `JournalDetail_journalEntryId_fkey`(`journalEntryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountGroup2Id_fkey` FOREIGN KEY (`accountGroup2Id`) REFERENCES `AccountGroup2`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountGroupId_fkey` FOREIGN KEY (`accountGroupId`) REFERENCES `AccountGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `AccountType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `TransactionMain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalDetail` ADD CONSTRAINT `JournalDetail_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalDetail` ADD CONSTRAINT `JournalDetail_journalEntryId_fkey` FOREIGN KEY (`journalEntryId`) REFERENCES `JournalEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
