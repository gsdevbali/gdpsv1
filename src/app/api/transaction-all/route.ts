import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'


// GET ALL TRANSACTIONS
export async function GET() {
    try
    {

        const query = await dbprisma.transactionAll.findMany({
            
            select: {
                id: true,
                accountId: true,
                description: true,
                ref: true,
                date: true,
                debit: true,
                credit: true,
                
                // account: {
                //     select: {
                //         id: true,
                //       code: true,
                //       name: true,
                //     }
                //   }, 
            },

            orderBy: {
                date: 'desc',
            },
            
            



        });
        //console.log('query TRANSACTION ALL', query);
        return NextResponse.json(query, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }


    // EDIT TRANSACTION 
    export async function PUT(
        request: Request,
        { params }: { params: { id: number } }
    ) {
        try {
            const id = params.id
            const json = await request.json()
    
            const updatedTransaction = await dbprisma.transactionAll.update({
                where: { id: id },
                data: json,
            })
    
            revalidatePath('/transaction-all')
            return NextResponse.json(updatedTransaction)
        } catch (error) {
            return NextResponse.json(
                { error: 'Error updating transaction' },
                { status: 500 }
            )
        }
    }


// DELETE TRANSACTION
export async function DELETE(request: Request) {
  const { ids } = await request.json();

  // Here, you would typically delete the transactions from your database
  // For this example, we'll just return a success response
  console.log('Deleting transactions with ids:', ids);

  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({ success: true });
}
