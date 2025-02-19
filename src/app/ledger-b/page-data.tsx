"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaDataX from "./neraca-data-x";
import NeracaDataX1 from "./neraca-data-x-current";
import NeracaDataX2 from "./neraca-data-x-2";
import Divider from "@/components/Divider";

export default function ShowNSData({ title, accType, accGroup }: { title: string, accType: number; accGroup: number }) {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    const startPrevX = "2020-01-01";

    const newTitle = title.toUpperCase();
    // const accGroup = 1;
    // console.log('SHOW-NS-DATA:')
    // console.log('Start:', start)
    // console.log('End:', end)
    // console.log('StartPrev:', startPrev)
    // console.log('EndPrev:', endPrev)

    return (

        <>
            <div>
                <div className="flex flex-wrap">

                    <div className="w-3/6 pr-2">

                        <div className="flex justify-between">
                            <h2 className="text-blue-600 dark:text-orange-600 font-bold">{newTitle}</h2>
                            <h2 className="text-blue-600 dark:text-orange-600 font-bold">Saldo Awal</h2>
                        </div>
                        <Divider />

                        <Suspense fallback={<Loading section="Tab1" />}>
                            <NeracaDataX title="Tab1" titleTotal="Tab1" type={accType} group2={accGroup} start={startPrevX} end={endPrev} />
                        </Suspense>
                    </div>

                    <div className="w-2/6 pr-2">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">D / K</h2>
                        <Divider />

                        <Suspense fallback={<Loading section="Tab2" />}>
                            <NeracaDataX1 title="Tab2" titleTotal="Tab2" type={accType} group2={accGroup} start={start} end={end} />
                        </Suspense>
                    </div>

                    <div className="w-1/6">
                        {/* {titleMonthYear} */}
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo Akhir</h2>
                        <Divider />

                        <Suspense fallback={<Loading section="Tab3" />}>
                            <NeracaDataX2 title="Tab3" titleTotal="Tab3" type={accType} group2={accGroup} start={start} end={end} />
                        </Suspense>

                    </div>


                </div>

                <div className="h-4"></div>

            </div>

        </>
    )
}
