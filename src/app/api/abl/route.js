import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";

export async function GET() {
    try
    {
        const query = await dbprisma.account.findMany({
            select: {
                id: true,
                code: true,
                name: true,
                accountType: {
                    select: {
                        id: true,
                    }
                },
                accountGroup: {
                    select: {
                        id: true,
                    }
                },
                accountGroup2: {
                    select: {
                        id: true,
                    }
                },
                transactionAlls: {
                    select: {
                        date: true,
                        description: true,
                        debit: true,
                        credit: true,
                        flag: true,
                    }
                }
            }
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
        return NextResponse.json(accountsWithBalance, { status: 200 });
    }
    catch (e) {
        console.error("Error in GET request:", e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
    }
