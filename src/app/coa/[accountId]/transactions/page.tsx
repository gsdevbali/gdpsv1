import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";

async function getData(accountId: string) {
    const res = await fetch(`${global.baseUrl}/api/transbyid?accountId=${accountId}`, {
        cache: 'no-store'
    })
    const data = await res.json()
    //console.log(data)
    return data
}


export default async function Page({ params }: { params: { accountId: string } }) {
    const accountId = params.accountId as string
    const data = await getData(accountId)

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">
                <h2>Daftar Transaksi: {accountId}</h2>
                {/* <Divider /> */}
                {/* <AccountDialog mode="create">
                    <Button>Add New Account</Button>
                </AccountDialog> */}
                {/* <Button>Add New Account</Button> */}
                <DataTable columns={columns} data={data} />
            </div>
        </PageLayout>
    )
}