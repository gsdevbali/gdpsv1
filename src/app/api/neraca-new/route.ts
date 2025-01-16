
export const maxDuration = 30;

import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";


// GET /api/neraca?accountTypeId=1
// http://localhost:3000/api/neraca?accountTypeId=1

interface GroupedAccount {
    groupName: string;
    accounts: Array<any>; // Replace 'any' with your account type if available
    subtotal: number;
}

interface GroupedAccountsDict {
    [key: string]: GroupedAccount;  // Use string as key instead of number
}

export async function GET(request: Request) {
    try
    {

        // Extract accountTypeId from the request query parameters
        const { searchParams } = new URL(request.url);
        const accountTypeId = searchParams.get('accountTypeId');
        const accountGroup2Id = searchParams.get('accountGroup2Id');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!accountTypeId) {
            return NextResponse.json({ error: 'accountTypeId is required' }, { status: 400 });
        }

        if (!accountGroup2Id) {
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
                accountGroup2Id: parseInt(accountGroup2Id),

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

        // Group accounts by accountGroup
        const groupedAccounts = accountsWithBalance.reduce((groups: GroupedAccountsDict, account) => {
            const groupId = account.accountGroup.id;
            const groupName = account.accountGroup.name;
            
            if (!groups[groupId]) {
                groups[groupId] = {
                    groupName: groupName,
                    accounts: [],
                    subtotal: 0
                };
            }
            
            groups[groupId].accounts.push(account);
            groups[groupId].subtotal += account.balance;
            
            return groups;
        }, {});

        // Convert grouped object to array for easier frontend handling
        const finalGroupedAccounts = Object.values(groupedAccounts);

        // Calculate the total balance (remains the same)
        const totalBalance = accountsWithBalance.reduce((sum, account) => sum + account.balance, 0);

        return NextResponse.json({
            groupedAccounts: finalGroupedAccounts,
            totalBalance: totalBalance
        }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }

