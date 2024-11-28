"use client"

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";
import Divider from "@/components/Divider";
import { Suspense, useState } from "react";
import Loading from "./loading";
import RugiLabaData from "./rl-data";
//import NeracaDataSub from "./neraca-data-sub";
//import { useState } from "react";

//import { useTotalRLDetail } from "./total-wrapper";
//import { useTotalRLDetail } from "@/context/total-rl-detail";


export default async function Page() {
    //const [loading, setLoading] = useState(false);


    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    // const selisihAkhir = toidr(totalAktiva - totalPasiva)
    // const isBalanceSheetEqual = (totalAktiva: number, totalPasiva: number) => {
    //     return totalAktiva === totalPasiva
    // }

    const [total, setTotal] = useState(999);

    return (

        <PageLayout header={header} footer={footer}>

            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN PENERIMAAN/PENGELUARAN</h1>
                <Divider />


                {/* PENERIMAAN */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENERIMAAN</h1>
                <Divider />


                <Suspense fallback={<Loading section="Penerimaan Persembahan" />}>
                    <RugiLabaData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} />
                </Suspense>

                <Suspense fallback={<Loading section="Penerimaan Lain-lain" />}>
                    <RugiLabaData title="Penerimaan Lain-lain" titleTotal="Penerimaan Lain-lain" type={4} group2={9} />
                </Suspense>


                {/* BEBAN / BIAYA2 */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENGELUARAN</h1>
                <Divider />


                <Suspense fallback={<Loading section="Biaya Operasional Gereja" />}>
                    <RugiLabaData title="Biaya Operasional Gereja" titleTotal="Biaya Operasional Gereja" type={5} group2={10} />
                </Suspense>

                <Suspense fallback={<Loading section="Biaya Sekretariat" />}>
                    <RugiLabaData title="Biaya Sekretariat" titleTotal="Biaya Sekretariat" type={5} group2={11} />
                </Suspense>

                <Suspense fallback={<Loading section="Biaya Bidang/Bapel" />}>
                    <RugiLabaData title="Biaya Bidang/Bapel" titleTotal="Biaya Bidang/Bapel" type={5} group2={12} />
                </Suspense>



                <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
                    {/* Rangkuman Neraca */}
                    <h1 className="text-xl font-bold pt-4 pb-2">TOTAL / RANGKUMAN</h1>
                    {/* {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>} */}

                    <TulisTotalRp value={'0'} title="Total Penerimaan" />
                    <TulisTotalRp value={'0'} title="Total Pengeluaran" />

                    {/* <TulisTotalRp value={selisihAkhir} title="Selisih Aset dan Pasiva" /> */}
                </div>
            </div>

        </PageLayout >

    )
}

