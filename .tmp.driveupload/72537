import dbprisma from "@/lib/dbprisma";
import { NextResponse } from "next/server";

// Initialize Prisma Client
//const prisma = new PrismaClient();

export async function GET() {
    try
    {
        const query = await dbprisma.account.findMany({
            select: {
                id: true,
                code: true,
                name: true,
                accountType: true,
                accountGroup: true,
                accountGroup2: true,
            }
        });
        return NextResponse.json(query, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    } finally {
        await dbprisma.$disconnect();
    }

    }
