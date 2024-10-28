import PageLayout from "@/components/PageLayout"
import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"

import global from "../../config.js";


async function getTransaction() {
    //const res = await fetch('http://localhost:3000/api/transactionall', { cache: 'no-store' })
    const res = await fetch(`${global.baseUrl}/api/transaction`)
    const data = await res.json()
    return data
}


export default async function ListTransactionPage() {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <h4>{global.pageInfo.footerText}</h4>;
    const data = await getTransaction()

    return (
        <>
            <PageLayout header={header} footer={footer}>
                <h1>TRANSAKSI J-Umum</h1>
                <div className='flex flex-col'>
                    <DataTable columns={columns} data={data} />
                </div>
            </PageLayout>
        </>
    )
}
