import { Prisma } from "@prisma/client";
import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";


// Contoh: 
//http://localhost:3000/api/activity?accountTypeId=1&accountGroup2Id=1&startDate=%222024-01-01%22&endDate=%222025-01-01%22

export async function GET(request: Request) {
    try
    {

        // Extract accountTypeId from the request query parameters
        const { searchParams } = new URL(request.url);
        const accountTypeId = searchParams.get('accountTypeId');
        const accountGroup2Id = searchParams.get('accountGroup2Id');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // if (!accountTypeId) {
        //     return NextResponse.json({ error: 'accountTypeId is required' }, { status: 400 });
        // }
        if (!accountGroup2Id) {
            return NextResponse.json({ error: 'accountGroup2Id is required' }, { status: 400 });
        }
        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
        }

       

        const query = await dbprisma.account.groupBy({
            by: ['accountGroup2Id'],
            where: {
              accountGroup2Id: parseInt(accountGroup2Id),
              transactionAlls: {
                some: {
                  date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                  },
                }
              }
            }
        });

          // Replace the existing accountsWithBalance calculation with:
          const accountsWithBalance = await Promise.all(query.map(async (group) => {
            const accounts = await dbprisma.account.findMany({
              where: {
                accountGroup2Id: group.accountGroup2Id,
              },
              include: {
                accountType: true,
                accountGroup: true,
                accountGroup2: true,
                transactionAlls: {
                  select: {
                    date: true,
                    description: true,
                    debit: true,
                    credit: true,
                    flag: true,
                  },
                  where: {
                    date: {
                      gte: new Date(startDate),
                      lte: new Date(endDate),
                    },
                  },
                },
              },
            });
          
            const groupBalance = accounts.reduce((acc, account) => {
              const accountBalance = account.transactionAlls.reduce((sum, transaction) => 
                sum + (transaction.debit - transaction.credit), 0);
              return acc + accountBalance;
            }, 0);
          
            return {
                accountGroup2Id: group.accountGroup2Id,
                accountCount: group._count?.id || 0,
                totalDebit: group._sum.debit || 0,
                totalCredit: group._sum.credit || 0,
                balance: (group._sum.debit || 0) - (group._sum.credit || 0),
                accounts: accounts,
              };
            }));

        // Calculate the sum of all balances
        const totalBalance = accountsWithBalance.reduce((sum, group) => sum + group.balance, 0);

        // return NextResponse.json(accountsWithBalance, { status: 200 });
        return NextResponse.json({
            accountGroups: accountsWithBalance,
            totalBalance: totalBalance
          }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }

