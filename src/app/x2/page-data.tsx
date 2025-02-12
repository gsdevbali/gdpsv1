"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaData from "./neraca-data-current";
import NeracaDataBefore from "./neraca-data-before";
import NeracaDataX from "./neraca-data-x";
import NeracaDataXcurrent from "./neraca-data-x-current";

import NeracaDataSelisih from "./hitung-ab-selisih";
import NeracaDataSelisihBefore from "./hitung-ab-selisih-before";
import NeracaDataAkhir from "./hitung-ab-akhir";
import NeracaDataAkhirBefore from "./hitung-ab-akhir-before";
import NeracaDataMoM from "./hitung-MoM";

export default function ShowNSData() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    console.log('SHOW-NS-DATA:')
    console.log('Start:', start)
    console.log('End:', end)
    console.log('StartPrev:', startPrev)
    console.log('EndPrev:', endPrev)

    return (

        <>
            <div>
                <div className="flex flex-wrap">
                    <div className="w-1/2">
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">{titlePrevMonthYear}</h2>
                        <JustTitle title="Saldo Akhir"/>
   
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaDataX title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start="2020-01-01" end={endPrev} />
                        </Suspense>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMonthYear}</h2>
                        <JustTitle title="Penerimaan Persembahan" />

                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaDataXcurrent title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                        </Suspense>

                    </div>
                    

                </div>

                <div className="h-4"></div>

                {/* TOTAL Info */}
                {/* <WidgetInfoTotal /> */}

            </div>

        </>
    )
}
