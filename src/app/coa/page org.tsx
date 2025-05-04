import { Suspense } from "react";

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import Loading from "@/components/Loading";
import { ClientDataTable } from "./client-data-tables";

// async function getAccount() {

//     // const res = await fetch(`${global.baseUrl}/api/accountbl`, {
//     //     cache: 'no-store'
//     // })
//     const res = await fetch(`${process.env.APP_URL}/api/abl`, {
//         cache: 'no-store'
//     })

//     const data = await res.json()
//     //console.log(data)
//     return data
// }

async function getAccount() {
    try {
        const url = `${process.env.APP_URL}/api/abl`;
        console.log('Fetching from:', url);
        
        const res = await fetch(url, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.log('Response status:', res.status);
            console.log('Response headers:', Object.fromEntries(res.headers));
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        // Ensure we return an array, even if empty
        return Array.isArray(data) ? data : [];

    } catch (error) {
        console.error('Error fetching accounts:', error);
        return [];
    }
}

export default async function AccountPage() {
    const data = await getAccount() || []; // Ensure data is always an array
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <Suspense fallback={<Loading section="Akun" />}>
                <div className="w-full">
                    {/* <Divider /> */}
                    {/* <AccountDialog mode="create">
                    <Button>Add New Account</Button>
                </AccountDialog> */}
                    <h1 className='text-2xl text-bold'>DAFTAR AKUN</h1>
                    <DataTable columns={columns} data={data} />
                    {/* <DataTable columns={columns()} data={data} /> */}
                    {/* <ClientDataTable initialData={data} /> */}


                </div>
            </Suspense>
        </PageLayout>
    )
}
