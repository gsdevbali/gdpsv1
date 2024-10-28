import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try
    {

        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
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
                    }
                  }, 
            },
            where: {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
            orderBy: {
                date: 'desc',
            },
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
