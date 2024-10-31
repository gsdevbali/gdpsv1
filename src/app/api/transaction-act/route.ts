import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";


//http://localhost:3000/api/transaction-act?startDate=%222024-01-01%22&endDate=%222025-01-01
//accountTypeId=1&accountGroup2Id=1&startDate=%222024-01-01%22&endDate=%222025-01-01%22


export async function GET(request: Request) {
    try
    {

        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const group2Id = searchParams.get('accountGroup2Id');

        if (!startDate || !endDate ) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
        }

        const query = await dbprisma.transactionAll.findMany({
            select: {
                id: true,
                description: true,
                ref: true,
                date: true,
                accountId: true,
                debit: true,
                credit: true,
                
                account: {
                    select: {
                        id: true,
                        code: true,
                        name: true,
                        accountTypeId: true,
                        accountGroupId: true,
                        accountGroup2Id: true,
                        
                        
                        accountGroup2: {
                            select: {
                                id: true,
                                name: true,
                                flag: true
                            }
                        }
                        
                    }

                }

                
                
            },
            where: {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
                // account: {
                //     accountGroup2Id: parseInt(group2Id)
                // }
            }
        });

        console.log('query TRANSACTION PERIODE', query);
        return NextResponse.json(query, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }


export async function DELETE(request: Request) {
  const { ids } = await request.json();

  // Here, you would typically delete the transactions from your database
  // For this example, we'll just return a success response
  console.log('Deleting transactions with ids:', ids);

  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({ success: true });
}
