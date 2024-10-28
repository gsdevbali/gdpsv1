import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const query = await dbprisma.transactionMain.findMany({
            orderBy: {
                date: 'desc',
            },
            select: {
                id: true,
                date: true,
                description: true,
                ref: true,
                accountId: true,
                account: {
                    select: {
                        code: true,
                        name: true,
                    }
                },
                transactions: {
                    select: {
                        id: true,
                        date: true,
                        description: true,
                        debit: true,
                        credit: true,
                    }
                }
                
            }
        })
        return NextResponse.json(query, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
