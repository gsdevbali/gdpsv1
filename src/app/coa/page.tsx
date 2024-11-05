import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import Loading from "@/app/loading";
import { Suspense } from "react";

async function getAccount() {
    
    // const res = await fetch(`${global.baseUrl}/api/accountbl`, {
    //     cache: 'no-store'
    // })
    const res = await fetch(`${process.env.APP_URL}/api/accountbl`, {
        cache: 'no-store'
    })
    
    const data = await res.json()
    //console.log(data)
    return data
}


export default async function AccountPage() {
    const data = await getAccount()
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <Suspense fallback={<Loading />}>
            <div className="w-full">
                {/* <Divider /> */}
                {/* <AccountDialog mode="create">
                    <Button>Add New Account</Button>
                </AccountDialog> */}
                <h1 className='text-2xl text-bold'>DAFTAR AKUN</h1>
                <DataTable columns={columns} data={data} />
            </div>
            </Suspense>
        </PageLayout>
    )
}
