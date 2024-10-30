'use server';

import prisma from '@/lib/dbprisma';

interface TransactionDetail {
  date: string;
  description: string;
  ref: string;
  mediaPath: string;
  debit: number;
  credit: number;
  accountId: number;
}

export async function createTransaction(transactions: TransactionDetail[]) {
  try {
    // Master Transaksi
    const masterTransaction = await prisma.transactionMain.create({
      data: {
        date: new Date(transactions[0].date),
        description: transactions[0].description,
        accountId: transactions[0].accountId,
      },
    });

    // Detail Transaksi
    const createdTransactions = await prisma.$transaction(
      transactions.map((transaction) =>
        prisma.transaction.create({
          data: {
            transactionId: masterTransaction.id,
            date: new Date(transaction.date),
            description: transaction.description,
            ref: transaction.ref,
            mediaPath: transaction.mediaPath,
            debit: transaction.debit,
            credit: transaction.credit,
            accountId: transaction.accountId,
          },
        })
      )
    );

    return { success: true, transactions: createdTransactions };
  } catch (error) {
    console.error('Error creating transactions:', error);
    return { success: false, error: 'Failed to create transactions' };
  }
}