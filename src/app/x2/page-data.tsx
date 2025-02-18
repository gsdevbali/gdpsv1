"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaDataX from "./neraca-data-x";
import NeracaDataXcurrent from "./neraca-data-x-current";
import NeracaDataX2 from "./neraca-data-x-2";
import Divider from "@/components/Divider";

export default function ShowNSData() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    const startPrevX = "2020-01-01";
    const accType = 1;
    const accGroup = 1;
    // console.log('SHOW-NS-DATA:')
    // console.log('Start:', start)
    // console.log('End:', end)
    // console.log('StartPrev:', startPrev)
    // console.log('EndPrev:', endPrev)

    return (

        <>
            <div>
                <div className="flex flex-wrap">
                    <div className="w-1/2 pr-2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo Awal</h2>
                        <Divider />
                        {/* <JustTitle title="Daftar Kelompok dan Akun"/> */}

                        <Suspense fallback={<Loading section="AKTIVA LANCAR X" />}>
                            <NeracaDataX title="ALX" titleTotal="ALX" type={accType} group2={accGroup} start={startPrevX} end={endPrev} />
                        </Suspense>
                    </div>

                    {/* <div className="w-1/4 pr-2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo Akhir {titleMonthYear}</h2>
                        <Divider />

                        <Suspense fallback={<Loading section="AKTIVA LANCAR - current" />}>
                            <NeracaDataXcurrent title="AL" titleTotal="AL" type={accType} group2={accGroup} start={start} end={end} />
                        </Suspense>
                    </div> */}

                    <div className="w-1/2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo Akhir</h2>
                        <Divider />
                        {/* <JustTitle title="Daftar Kelompok dan Akun"/> */}

                        <Suspense fallback={<Loading section="AKTIVA LANCAR X2 - SALDO+" />}>
                            <NeracaDataX2 title="AL" titleTotal="AL" type={accType} group2={accGroup} start={startPrevX} end={end} />
                        </Suspense>

                    </div>


                </div>

                <div className="h-4"></div>

            </div>

        </>
    )
}
