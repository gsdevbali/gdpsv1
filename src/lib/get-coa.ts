import prisma from "@/lib/dbprisma";

export default async function GetCoa(accountId: number) {

    const account = await prisma.account.findUnique({ where: { id: accountId } })    
    // const account = await prisma.account.findUnique({
    //     where: { id: accountId },
    //     select: {
    //         name: true,
    //         code: true,
    //     },
    // });
    return account;
}

// ... existing code ...