
import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";


async function getData() {
    const res = await fetch(`${global.baseUrl}/api/transaction-all`, { cache: 'no-store' })
    const data = await res.json()
    //console.log(data)
    return data
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