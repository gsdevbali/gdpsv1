'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveTransaction(formData) {
  // Extract and parse transactions data
  const flagJurnalUmum = 'u'; // untuk 'Jurnal Umum'
  const transactions = JSON.parse(formData.get('transactions') || '[]');

  // Extract main transaction data
  const main = {
    date: formData.get('date'),
    //description: formData.get('description'),
    ref: formData.get('ref'),
    //accountId: parseInt(accountId),
  };

  console.log('action-main TANGGAL', main.date);
  console.log('action-main REF', main.ref);

  try {
    const result = await prisma.$transaction(async (prisma) => {
        // Calculate sums before creating transactions
    //   const { totalDebit, totalCredit } = transactions.reduce(
    //     (acc, t) => ({
    //       totalDebit: acc.totalDebit + (parseFloat(t.debit) || 0),
    //       totalCredit: acc.totalCredit + (parseFloat(t.credit) || 0),
    //     }),
    //     { totalDebit: 0, totalCredit: 0 }
    //   );

      // Create Main - temporary - nantinya tidak perlu???
    //   const transactionMain = await prisma.transactionMain.create({
    //     data: {
    //         date: new Date(main.date),
    //         description: main.description,
    //         ref: main.ref,
    //         accountId: main.accountId,
    //       },
    //   });
    
      // 1: Save main transaction ( Also in Transaction )
    //   const mainAllTransaction = await prisma.transactionAll.create({
    //     data: {
    //       date: new Date(main.date),
    //       description: main.description,
    //       ref: main.ref,
    //       accountId: main.accountId,
    //       debit: totalCredit, // Assuming main transaction doesn't have debit/credit
    //       credit: totalDebit, // You may need to adjust this based on your requirements
    //     //   account: {
    //     //     connect: {
    //     //       id: main.accountId,
    //     //     },
    //     //   },
    //       //transactionId: transactionMain.id,
          
    //     },
    //   });

      // 2: Save detailed transactions
      const savedAllTransactions = await prisma.transactionAll.createMany({
        data: transactions.map(t => ({
          date: new Date(main.date), // Using the main date for all transactions
          description: t.description,
          ref: main.ref || '', 
          mediaPath: t.mediaPath || '',
          debit: parseFloat(t.debit) || 0,
          credit: parseFloat(t.credit) || 0,
          accountId: parseInt(t.accountId),
          flag: flagJurnalUmum, // untuk 'Jurnal Umum'
        //   account: {
        //     connect: {
        //       id: main.accountId,
        //     },
        //   },
          //transactionId: mainSelfTransaction.id,
        })),
      });

      

      console.log('action- Saved detailed ALL transactions:', savedAllTransactions);
      //console.log('action-Saved main ALL transaction:', mainAllTransaction)
      return { savedAllTransactions };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating transactions:', error);
    return { success: false, error: 'Error creating transactions' };
  }
}