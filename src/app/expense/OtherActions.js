'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveTransaction(formData, accountId) {
  // Extract and parse transactions data
  const transactions = JSON.parse(formData.get('transactions') || '[]');

  // Extract main transaction data
  const main = {
    date: formData.get('date'),
    description: formData.get('description'),
    ref: formData.get('ref'),
    accountId: parseInt(accountId),
  };

  //console.log('action-main TANGGAL', main.date);
  try {
    const result = await prisma.$transaction(async (prisma) => {
        // Calculate sums before creating transactions
      const { totalDebit, totalCredit } = transactions.reduce(
        (acc, t) => ({
          totalDebit: acc.totalDebit + (parseFloat(t.debit) || 0),
          totalCredit: acc.totalCredit + (parseFloat(t.credit) || 0),
        }),
        { totalDebit: 0, totalCredit: 0 }
      );

    
      // 1: Save main transaction ( Also in Transaction )
      // Jumlah Pengeluaran masuk ke Kredit
      const mainAllTransaction = await prisma.transactionAll.create({
        data: {
          date: new Date(main.date),
          description: main.description,
          ref: main.ref,
          accountId: main.accountId,
          debit: 0, // Assuming main transaction doesn't have debit/credit
          credit: totalDebit, // You may need to adjust this based on your requirements
        //   account: {
        //     connect: {
        //       id: main.accountId,
        //     },
        //   },
          //transactionId: transactionMain.id,
          
        },
      });

      // 2: Save detailed transactions
      const savedAllTransactions = await prisma.transactionAll.createMany({
        data: transactions.map(t => ({
          date: new Date(main.date), // Using the main date for all transactions
          description: t.description,
          ref: main.ref,
          mediaPath: t.mediaPath || '',
          debit: parseFloat(t.debit) || 0,
          credit: parseFloat(t.credit) || 0,
          accountId: parseInt(t.accountId),
        //   account: {
        //     connect: {
        //       id: main.accountId,
        //     },
        //   },
          //transactionId: mainSelfTransaction.id,
        })),
      });

      

      //console.log('action- Saved detailed ALL transactions:', savedAllTransactions);
      //console.log('action-Saved main ALL transaction:', mainAllTransaction)
      return { savedAllTransactions, mainAllTransaction };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating transactions:', error);
    return { success: false, error: 'Error creating transactions' };
  }
}