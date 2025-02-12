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

        if (!accountTypeId) {
            return NextResponse.json({ error: 'accountTypeId is required' }, { status: 400 });
        }

        const accountGroup2Id = searchParams.get('accountGroup2Id');
        if (!accountGroup2Id) {
            return NextResponse.json({ error: 'accountGroup2Id is required' }, { status: 400 });
        }

        const query = await dbprisma.transactionAll.findMany({

            select: {
                accountId: true,
                
                description: true,
                ref: true,
                date: true,
                debit: true,
                credit: true,
                
                account: {
                    select: {
                      code: true,
                      accountType: {
                        select: {
                            id: true,
                        }
                      }
                    },
                    
                  },  
            },
            orderBy: {
                date: 'desc',
            },
            where: {
                account: {
                    accountType: {
                        id: parseInt(accountTypeId)
                    },
                    accountGroup2: {
                        id: parseInt(accountGroup2Id)
                    }
                }
            }
        });


        // Calculate the balance for each account
        // Hitung Balance
        // const accountsWithBalance = query.map((account) => {
        //     const initialBalance = 0;
        //     const balance = account.transactionAlls.reduce((acc, transaction) => {
        //     return acc + (transaction.debit - transaction.credit);
        //     }, initialBalance);

        //     return { 
        //         ...account,
        //     balance, // saldo akhir untuk akun ini
        //         };
        // });


        console.log('query TRANSACTION ALL', query);
        return NextResponse.json(query, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }

