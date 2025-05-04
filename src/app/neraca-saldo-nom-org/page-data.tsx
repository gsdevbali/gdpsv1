"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import Divider from "@/components/Divider";
import toidr from "@/lib/toidr";
import Loading from "@/components/Loading";
import useAktivitasContext from "@/context/aktivitas-context";

import NeracaDataX from "./neraca-data-x";
import NeracaDataX2 from "./neraca-data-x-2";
import NeracaDataDebit from "./neraca-data-x-debit";
import NeracaDataCredit from "./neraca-data-x-credit";
import SubTotalDK from "./total-dk";
import SubTotalRekap from "./total-rekap";

export default function ShowNSData({ title, accType, accGroup }: { title: string, accType: number; accGroup: number }) {

    return (
        <>
            <div>
                <div className="h-4"></div>
                <ShowDataAB />
                <div className="h-4"></div>
                <ShowData title='Penerimaan Persembahan' accType={4} accGroup={8} />
                <div className="h-8"></div>
                <ShowData title='Penerimaan Lain-lain' accType={4} accGroup={9} />
                <div className="h-8"></div>
                <ShowData title='Biaya Operasional' accType={5} accGroup={10} />
                <div className="h-8"></div>
                <ShowData title='Biaya Sekretariat' accType={5} accGroup={11} />
                <div className="h-8"></div>
                <ShowData title='Biaya Bidang & Bapel' accType={5} accGroup={12} />
                <div className="h-4"></div>
                <ShowDataAB />
                <div className="h-4"></div>

            </div>
        </>
    )
}

//
function ShowData({ title, accType, accGroup }: { title: string, accType: number; accGroup: number }) {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    const startPrevX = "2020-01-01";

    return (
        <>
            <div className="flex flex-row">

                {/* KELOMPOK AKUN & SALDO AWAL */}
                <div className="w-3/4 pr-2">
                    <div className="flex justify-between">
                        <h2 className="text-blue-600 dark:text-orange-600 font-bold">{title}</h2>
                        <h2 className="text-blue-600 dark:text-orange-600 font-bold">Saldo Awal</h2>
                    </div>
                    <Divider />

                    {/* kolom AKUN dan Saldo Awal */}
                    <Suspense fallback={<Loading section="Tab1" />}>
                        <NeracaDataX title="Tab1" titleTotal="Tab1" type={accType} group2={accGroup} start={startPrevX} end={endPrev} />
                    </Suspense>
                </div>

                {/* MUTASI */}
                <div className="w-3/5 pr-2">
                    <div>
                        <h2 className="text-center text-blue-600 dark:text-orange-600 font-bold">MUTASI</h2>
                    </div>
                    <Divider />

                    <div className="flex flex-row gap-2">

                        {/* kolom DEBET */}
                        <Suspense fallback={<Loading section="Tab2" />}>
                            <NeracaDataDebit title="Tab2" titleTotal="Tab2" type={accType} group2={accGroup} start={start} end={end} />
                        </Suspense>

                        {/* kolom KREDIT */}
                        <Suspense fallback={<Loading section="Tab2" />}>
                            <NeracaDataCredit title="Tab2" titleTotal="Tab2" type={accType} group2={accGroup} start={start} end={end} />
                        </Suspense>

                    </div>
                </div>

                {/* SALDO AKHIR */}
                <div className="w-1/4">
                    {/* {titleMonthYear} */}
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo Akhir</h2>
                    <Divider />

                    {/* kolom Saldo Akhir */}
                    <Suspense fallback={<Loading section="Tab3" />}>
                        <NeracaDataX2 title="Tab3" titleTotal="Tab3" type={accType} group2={accGroup} start={start} end={end} />
                    </Suspense>

                </div>

            </div>
        </>
    )
}


//
function ShowDataAB() {
    
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, } = useAktivitasContext();

    const totalPenerimaan = totalTerima1 + totalTerima2;
    const totalBiaya = totalBebanOp + totalBeban2 + totalBeban3;
    const totalSelisih = totalPenerimaan - (totalBiaya);

    const selisih = totalTerima1 + totalTerima2 - (totalBebanOp + totalBeban2 + totalBeban3);

    return (
        <>

        {/* <h2>Total Penerimaan: {totalTerima1+totalTerima2}</h2> */}
        <SubTotalRekap value={toidr(totalPenerimaan)} title="Total Penerimaan" />
        {/* <h2>Total Biaya{totalBebanOp+totalBeban2+totalBeban3}</h2> */}
        <SubTotalRekap value={toidr(totalBiaya)} title="Total Biaya" />
        {/* <h2>Surplus/Defisit{selisih}</h2> */}
        <SubTotalRekap value={toidr(totalSelisih)} title="Surplus/Defisit" />


        </>
    );
}
