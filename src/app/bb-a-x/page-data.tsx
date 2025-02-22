"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaDataCurrent from "./neraca-data-current";
import NeracaDataPrevious from "./neraca-data-previous";
import Divider from "@/components/Divider";

export default function ShowNSData() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    // console.log('SHOW-NS-DATA:')
    // console.log('Start:', start)
    // console.log('End:', end)
    // console.log('StartPrev:', startPrev)
    // console.log('EndPrev:', endPrev)
    const formattedEndPrev = new Date(endPrev).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const startPrevX = "2020-01-01";

    return (

        <>
            <div>
                <div className="flex flex-wrap">
                    <div className="w-1/2 pr-2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo s/d {formattedEndPrev}</h2>
                        <Divider />
                        {/* <JustTitle title="Daftar Kelompok dan Akun"/> */}

                        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                            <NeracaDataCurrent title="AL" titleTotal="AKTIVA LANCAR" type={1} group2={8} start={startPrevX} end={endPrev} />
                        </Suspense>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Periode {titleMonthYear}</h2>
                        <Divider />
                        {/* <JustTitle title="Daftar Kelompok dan Akun"/> */}

                        <Suspense fallback={<Loading section="AKTIVA LANCAR X" />}>
                            <NeracaDataPrevious title="ALX" titleTotal="AKTIVA LANCAR" type={1} group2={8} start={start} end={end} />
                        </Suspense>

                    </div>


                </div>

                <div className="h-4"></div>

            </div>

        </>
    )
}
