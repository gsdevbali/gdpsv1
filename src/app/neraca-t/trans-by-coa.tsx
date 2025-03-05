import { Suspense } from "react";

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import Loading from "@/components/Loading";
import prisma from "@/lib/dbprisma";

async function getData(accountId: number) {
    // const res = await fetch(`${global.baseUrl}/api/transbyid?accountId=${accountId}`, {
    //     cache: 'no-store'
    // })
    const res = await fetch(`${process.env.APP_URL}/api/transbyid?accountId=${accountId}`, {
        cache: 'no-store'
    })
    const data = await res.json()
    //console.log(data)
    return data
}


export default async function TransByCoaId({ params }: { params: { accountId: number, code: string, name: string} }) {
    //const accountId = params.accountId
    //const account = await prisma.account.findUnique({ where: { id: accountId } })
    const data = await getData(params.accountId)

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">
                <h2 className="text-lg font-bold">Daftar Transaksi Akun: {params.code} - {params.name}</h2>

                <Divider />
            <Suspense fallback={<Loading section="Transaksi" />}>
                <DataTable columns={columns} data={data} />
            </Suspense>        

            </div>
        </PageLayout>
    )
}
