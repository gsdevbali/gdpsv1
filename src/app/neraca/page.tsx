import { DataTable } from "./data-tables";
import { columns } from "./columns";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";
import Divider from "@/components/Divider";
import { Suspense } from "react";
import Loading from "./loading";
import AktivaLancar from "./nrcAktivaLancar";
import AktivaTidakLancar from "./nrcAktivaTidakLancar";
//import { useState } from "react";


//http://localhost:3000/api/neraca?accountTypeId=1
//http://localhost:3000/api/neraca?accountTypeId=1&accountGroup2Id=2

//Aktiva - Aktiva Lancar


export default async function Page() {
    //const [loading, setLoading] = useState(false);

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    // const newTotalBalance_AktivaLancar = toidr(totalBalance_AktivaLancar)
    // const newTotalBalance_AktivaTidakLancar = toidr(totalBalance_AktivaTidakLancar)
    // const newTotalBalance_AktivaTetap = toidr(totalBalance_AktivaTetap)
    // const newTotalBalance_Kewajiban = toidr(totalBalance_Kewajiban1 + totalBalance_Kewajiban2)
    // const newTotalBalance_AsetBersih = toidr(totalBalance_AsetBersih1 + totalBalance_AsetBersih2)

    // const totalAktiva = totalBalance_AktivaLancar + totalBalance_AktivaTidakLancar + totalBalance_AktivaTetap
    // const totalPasiva = totalBalance_Kewajiban1 + totalBalance_Kewajiban2 + totalBalance_AsetBersih1 + totalBalance_AsetBersih2
    // const newTotalAktiva = toidr(totalAktiva)
    // const newTotalPasiva = toidr(totalPasiva)

    {/* Selisih Aset dan Pasiva */ }
    // const selisihAkhir = toidr(totalAktiva - totalPasiva)

    const isBalanceSheetEqual = (totalAktiva: number, totalPasiva: number) => {
        return totalAktiva === totalPasiva
    }


    return (


        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">NERACA</h1>
                <Divider />

                {/* AKTIVA - KIRI */}

                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">AKTIVA</h1>
                <Divider />

                <Suspense fallback={<h2>Loading AL...</h2>}>
                    <AktivaLancar />
                </Suspense>

                <Suspense fallback={<h2>Loading ATL...</h2>}>
                    <AktivaTidakLancar />
                </Suspense>




                {/* PASIVA - KANAN */}

                <h2 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">KEWAJIBAN DAN ASET BERSIH</h2>
                <Divider />

                <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN</h2>

                <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN LANCAR</h2>

                <h2 className="text-lg font-bold pt-2 pb-2">ASET BERSIH</h2>


                <div className="h-4"></div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
                    {/* Rangkuman Neraca */}
                    {/* <h1 className="text-xl font-bold pt-4 pb-2">RANGKUMAN NERACA</h1>
                    {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>}

                    <TulisTotalRp value={newTotalAktiva} title="ASET" />
                    <TulisTotalRp value={newTotalPasiva} title="PASIVA (Kewajiban + Aset Bersih)" />



                    <TulisTotalRp value={selisihAkhir} title="Selisih Aset dan Pasiva" /> */}
                </div>
            </div>
        </PageLayout >

    )
}
