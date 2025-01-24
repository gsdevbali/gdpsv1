"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaData from "./neraca-data-current";
import NeracaDataBefore from "./neraca-data-before";
import NeracaDataPendapatanBefore from "./hitung-pendapatan-before";
import NeracaDataPendapatan from "./hitung-pendapatan";
import NeracaDataMoM from "./hitung-MoM";
import NeracaDataSurplus1 from "./hitung-surplus1";
import NeracaDataSurplus2 from "./hitung-surplus2";
import NeracaDataSurplus1Before from "./hitung-surplus1-before";
import NeracaDataSurplus2Before from "./hitung-surplus2-before";

export default function ShowNSData() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();

    console.log('SHOW-NS-DATA-ARUSKAS:')
    console.log('Start:', start)
    console.log('End:', end)
    console.log('StartPrev:', startPrev)
    console.log('EndPrev:', endPrev)

    return (

        <>
            <div>

                <div className="flex flex-wrap">

                    <div className="w-1/3">
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKUN</h2>
                        <JustTitle title="Penerimaan Persembahan" />
                        <JustTitle title="Penerimaan Lain-lain/Khusus" />
                        <JustTitle title="Jumlah Penerimaan" />
                        <JustTitle title="Beban Operasional" />
                        <JustTitle title="Surplus (Defisit)" />
                        <JustTitle title="Beban Penyusutan" />
                        <JustTitle title="--- Surplus (Defisit)" />
                    </div>
                    <div className="w-1/4">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titlePrevMonthYear}</h2>
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaDataBefore title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                            <NeracaDataBefore title="PENERIMAAN LAIN" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="JUMLAH" />}>
                            <NeracaDataPendapatanBefore title="" titleTotal="" />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                            <NeracaDataBefore title="BEBAN OPERASIONAL" titleTotal="Beban Operasional" type={5} group2={10} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="SURPLUS 1" />}>
                            <NeracaDataSurplus1Before title="" titleTotal="" />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN" />}>
                            <NeracaDataBefore title="BEBAN" titleTotal="Beban Penyusutan" type={1} group2={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="SURPLUS 2" />}>
                            <NeracaDataSurplus2Before title="" titleTotal="" />
                        </Suspense>


                    </div>
                    <div className="w-1/4">
                        {/* <Divider /> */}
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMonthYear}</h2>
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaData title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                            <NeracaData title="PENERIMAAN LAIN" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="JUMLAH" />}>
                            <NeracaDataPendapatan title="" titleTotal="" />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                            <NeracaData title="BEBAN OPERASIONAL" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="SURPLUS 1" />}>
                            <NeracaDataSurplus1 title="" titleTotal="" />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN" />}>
                            <NeracaData title="BEBAN" titleTotal="Beban Penyusutan" type={1} group2={2} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="SURPLUS 2" />}>
                            <NeracaDataSurplus2 title="" titleTotal="" />
                        </Suspense>
                    </div>


                    <div className="w-1/6">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">MoM (%)</h2>
                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={1} />
                        </Suspense>

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={2} />
                        </Suspense>

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={3} />
                        </Suspense>

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={4} />
                        </Suspense>

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={5} />
                        </Suspense>

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={6} />
                        </Suspense>

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={7} />
                        </Suspense>

                    </div>

                    {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN</h2> */}
                    {/* <Suspense fallback={<Loading section="PENDAPATAN" />}>
                    <NeracaData title="PENDAPATAN" titleTotal="Pendapatan" type={4} group2={8} start={start} end={end} />
                </Suspense>

                <Suspense fallback={<Loading section="PENDAPATAN LAIN-LAIN" />}>
                    <NeracaData title="PENDAPATAN LAIN" titleTotal="Pendapatan Lain" type={9} group2={8} start={start} end={end} />
                </Suspense> */}



                </div>


                <div className="h-4"></div>

                {/* TOTAL Info */}
                {/* <WidgetInfoTotal /> */}


            </div>

        </>
    )
}
