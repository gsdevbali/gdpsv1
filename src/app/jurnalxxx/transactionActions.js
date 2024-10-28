'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveTransaction(formData) {
  // Extract main transaction data
  const main = {
    date: formData.get('date'),
    description: formData.get('description'),
    ref: formData.get('ref'),
    accountId: parseInt(formData.get('accountId')),
  };

  //const transactions = [];
  // Extract and parse transactions data
  const transactions = JSON.parse(formData.get('transactions') || '[]');

  let i = 0;
  while (formData.get(`transactions[${i}].description`)) {
    transactions.push({
      description: formData.get(`transactions[${i}].description`),
      debit: parseFloat(formData.get(`transactions[${i}].debit`)),
      credit: parseFloat(formData.get(`transactions[${i}].credit`)),
      accountId: parseInt(formData.get(`transactions[${i}].accountId`)),
    });
    i++;
  }

  

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Create TransactionMain
      const transactionMain = await prisma.transactionMain.create({
        data: {
          date: new Date(main.date),
          description: main.description,
          ref: main.ref,
          accountId: main.accountId,
          transactions: {
            create: transactions.map(t => ({
              date: new Date(main.date), // Using the main date for all transactions
              description: t.description,
              ref: t.ref || '',
              mediaPath: t.mediaPath || '',
              debit: parseFloat(t.debit) || 0,
              credit: parseFloat(t.credit) || 0,
              accountId: parseInt(t.accountId),
            })),
          },
        },
        include: {
          transactions: true,
        },
      });

      console.log('Saving main transaction:', main);
  console.log('Saving detailed transactions:', transactions);
      return transactionMain;
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating transaction:', error);
    return { success: false, error: 'Error creating transaction' };
  }
}