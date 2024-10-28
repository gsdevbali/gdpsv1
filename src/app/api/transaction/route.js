import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";

export async function GET() {
    try
    {
        const query = await dbprisma.transactionAll.findMany({
            select: {
                accountId: true,
                description: true,
                date: true,
                debit: true,
                credit: true,
                account: {
                    select: {
                      code: true,
                    }
                  },  
            },
            orderBy: {
                date: 'desc',
            },
        });
        console.log('query TRANSACTION ALL', query);
        return NextResponse.json(query, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }


export async function DELETE(request) {
  const { ids } = await request.json();

  // Here, you would typically delete the transactions from your database
  // For this example, we'll just return a success response
  console.log('Deleting transactions with ids:', ids);

  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({ success: true });
}
