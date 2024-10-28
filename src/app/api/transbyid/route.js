import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) {
        return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    try {
        const transactions = await prisma.transactionAll.findMany({
            include: {
                account: true
            },
            where: {
                accountId: parseInt(accountId)
            },
            orderBy: {
                date: 'desc'
            }
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Error fetching transactions' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
