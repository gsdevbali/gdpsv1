
export const maxDuration = 30;

import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";


// GET /api/neraca?accountTypeId=1
// http://localhost:3000/api/neraca?accountTypeId=1

export async function GET(request: Request) {
    try
    {

        // Extract accountTypeId from the request query parameters
        const { searchParams } = new URL(request.url);
        const accountTypeId = searchParams.get('accountTypeId');
        const accountGroupId = searchParams.get('accountGroupId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!accountTypeId) {
            return NextResponse.json({ error: 'accountTypeId is required' }, { status: 400 });
        }

        if (!accountGroupId) {
            return NextResponse.json({ error: 'accountGroup2Id is required' }, { status: 400 });
        }

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
        }

        const query = await dbprisma.account.findMany({
            
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
              where: {
                accountTypeId: parseInt(accountTypeId),
                accountGroupId: parseInt(accountGroupId),

              },
        });

        // Hitung Balance
        const accountsWithBalance = query.map((account) => {
            const initialBalance = 0;
            const balance = account.transactionAlls.reduce((acc, transaction) => {
            return acc + (transaction.debit - transaction.credit);
            }, initialBalance);

            return { 
                ...account,
            balance, // saldo akhir untuk akun ini
                };
        });

        // Calculate the sum of all balances
        const totalBalance = accountsWithBalance.reduce((sum, account) => sum + account.balance, 0);

        // return NextResponse.json(accountsWithBalance, { status: 200 });
        return NextResponse.json({
            accounts: accountsWithBalance,
            totalBalance: totalBalance
        }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }

