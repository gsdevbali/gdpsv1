import React from 'react'

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";
import Divider from "@/components/Divider";
import { DataTable } from "./data-tables";
import { columns } from "./columns";


// const getActivity = async (start: string, end: string, accountTypeId: number, accountGroup2Id: number) => {
//     //const res = await fetch(`${global.baseUrl}/api/activity?startDate=${start}&endDate=${end}&accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`);
//     const res = await fetch(`${process.env.APP_URL}/api/activity?startDate=${start}&endDate=${end}&accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`);
//     const data = await res.json()
//     return {
//         accounts: data.accounts,
//         totalBalance: data.totalBalance
//     }
// };

async function getData(start: string, end: string) {
    // const res = await fetch(`${global.baseUrl}/api/transaction-all`, { cache: 'no-store' })
    // const data = await res.json()
    // //console.log(data)
    // return data
    try {
        //const res = await fetch(`${global.baseUrl}/api/transaction-all`, { cache: 'no-store' })
        //const res = await fetch(`${process.env.APP_URL}/api/transaction-act?startDate=${start}&endDate=${end}&accountGroup2Id=${group2Id}`, { cache: 'no-store' })
        const res = await fetch(`${process.env.APP_URL}/api/transaction-act?startDate=${start}&endDate=${end}`, { cache: 'no-store' })

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


export default async function RepActivity() {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    // contoh dari NeraCa
    //const { accounts: data_AsetBersih2, totalBalance: totalBalance_AsetBersih2 } = await getNeraca(3, 7)

    // const dateStart = '2024-01-01';
    // const dateEnd = '2025-01-01';

    // //Persembahan:
    // const { accounts: data_persembahan, totalBalance: totalBalance_Persembahan } = await getActivity(dateStart, dateEnd, 1, 8)
    // //Beban Operasional:
    // const { accounts: data_bebanOperasional, totalBalance: totalBalance_BebanOperasional } = await getActivity(dateStart, dateEnd, 5, 10)

    // const newTotalBalance_Persembahan = toidr(totalBalance_Persembahan)
    // const newTotalBalance_BebanOperasional = toidr(totalBalance_BebanOperasional)

    //
    // 1: Aktiva Lancar
    // 2: Aktiva Tetap
    // 3: Aktiva Lainnya
    // 4: Kewajiban Lancar
    // 5: Kewajiban Jangka Panjang
    // 6: Aset Bersih Awal
    // 7: Kenaikan (Penurunan) Aset Bersih
    // 8: Penerimaan Persembahan
    // 9: Penerimaan Lain-lain
    // 10: Biaya Operasional Gereja
    // 11: Biaya Sekretariat
    // 12: BIaya Bidang & Bapel

    const start = "2020-01-01"
    const today = new Date().toISOString().split('T')[0];
    const data = await getData(start, today)
    //console.log('data Query First:', data)

    return (
        <>
            <PageLayout header={header} footer={footer}>

                <DataTable columns={columns} data={data} />
                {/* <h1 className="text-2xl font-bold">PERSEMBAHAN:</h1>
                <DataTable columns={columns} data={data_persembahan} />
                <TulisTotalRp value={newTotalBalance_Persembahan} title={"Penerimaan Persembahan"} />

                <h1 className="text-2xl font-bold">BEBAN OPERASIONAL:</h1>
                <DataTable columns={columns} data={data_bebanOperasional} />
                <TulisTotalRp value={newTotalBalance_BebanOperasional} title={"Beban Operasional"} /> */}

            </PageLayout>
        </>
    )
}

