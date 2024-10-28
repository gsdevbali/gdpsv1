import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { main, transactions } = req.body;

      const result = await prisma.$transaction(async (prisma) => {
        // Create TransactionMain
        const transactionMain = await prisma.transactionMain.create({
          data: {
            date: new Date(main.date),
            description: main.description,
            ref: main.ref,
            accountId: parseInt(main.accountId),
            transactions: {
              create: transactions.map(t => ({
                date: new Date(main.date), // Using the main date for all transactions
                description: t.description,
                ref: t.ref,
                mediaPath: t.mediaPath,
                debit: parseFloat(t.debit),
                credit: parseFloat(t.credit),
                accountId: parseInt(t.accountId),
              })),
            },
          },
          include: {
            transactions: true,
          },
        });

        return transactionMain;
      });

      res.status(200).json(result);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Error creating transaction' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}