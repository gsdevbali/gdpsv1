import React from 'react'

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";
import Divider from "@/components/Divider";

const getActivity = async (start: string, end: string, accountTypeId: number, accountGroup2Id: number) => {
    const res = await fetch(`${global.baseUrl}/api/activity?startDate=${start}&endDate=${end}&accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`);
    const data = await res.json()
    return {
        accounts: data.accounts,
        totalBalance: data.totalBalance
    }
};

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

    return (
        <>
            <PageLayout header={header} footer={footer}>
                <h1 className="text-3xl font-bold">LAPORAN AKTIVITAS</h1>
                <Divider />

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
