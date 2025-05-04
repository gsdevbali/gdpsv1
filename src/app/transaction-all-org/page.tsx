
import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";


async function getData() {
    // const res = await fetch(`${global.baseUrl}/api/transaction-all`, { cache: 'no-store' })
    // const data = await res.json()
    // //console.log(data)
    // return data
    try {
        //const res = await fetch(`${global.baseUrl}/api/transaction-all`, { cache: 'no-store' })
        const res = await fetch(`${process.env.APP_URL}/api/transaction-all`, { cache: 'no-store' })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        return [] // Return empty array as fallback
    }
}


export default async function Page() {
    const data = await getData()

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">
                <DataTable columns={columns} data={data} />
            </div>
        </PageLayout>
    )
}
