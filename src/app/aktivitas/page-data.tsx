"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Divider from "@/components/Divider";
import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaData from "./neraca-data-current";
import NeracaDataBefore from "./neraca-data-before";
import NeracaDataSelisih from "./hitung-ab-selisih";
import NeracaDataSelisihBefore from "./hitung-ab-selisih-before";
import NeracaDataAkhir from "./hitung-ab-akhir";
import NeracaDataAkhirBefore from "./hitung-ab-akhir-before";
import NeracaDataMoM from "./hitung-MoM";
import NeracaDataPendapatanBefore from "./hitung-pendapatan-before";
import NeracaDataSurplus1Before from "./hitung-surplus1-before";
import NeracaDataSurplus2Before from "./hitung-surplus2-before";
import NeracaDataPendapatan from "./hitung-pendapatan";
import NeracaDataSurplus1 from "./hitung-surplus1";
import NeracaDataSurplus2 from "./hitung-surplus2";

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

                <Divider />
                <h1 className="text-2xl font-bold dark:text-blue-500">AKTIVITAS {titleMonthYear}</h1>
                <div className="flex flex-wrap">
                    <div className="w-1/3">
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKUN</h2>
                        <JustTitle title="Penerimaan Persembahan" />
                        <JustTitle title="Beban Operasional" />
                        <JustTitle title="Beban Sekretariat" />
                        <JustTitle title="Beban Bidang & Bapel" />
                        <JustTitle title="Penerimaan Lain-lain/Khusus" />
                        <JustTitle title="Kenaikan (Penurunan) Aset Bersih" />
                        <JustTitle title="Aset Bersih Awal" />
                        <JustTitle title="Aset Bersih Akhir" />
                        {/* 
                        */}
                    </div>
                    <div className="w-1/4">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titlePrevMonthYear}</h2>
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaDataBefore title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                            <NeracaDataBefore title="BEBAN OPERASIONAL" titleTotal="Beban Operasional" type={5} group2={10} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL 2" />}>
                            <NeracaDataBefore title="BEBAN OPERASIONAL" titleTotal="Beban Sekretariat" type={5} group2={11} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL 3" />}>
                            <NeracaDataBefore title="BEBAN OPERASIONAL" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                            <NeracaDataBefore title="PENERIMAAN LAIN" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="KENAIKAN/PENURUNAN AB" />}>
                            <NeracaDataSelisihBefore title="KENAIKAN/PENURUNAN AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" />
                        </Suspense>

                        <Suspense fallback={<Loading section="ASET BERSIH AWAL" />}>
                            <NeracaDataBefore title="ASET BERSIH AWAL" titleTotal="Aset Bersih Awal" type={3} group2={6} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="ASET BERSIH AKHIR" />}>
                            <NeracaDataAkhirBefore title="ASET BERSIH AKHIR" titleTotal="Aset Bersih Akhir" />
                        </Suspense>

                    </div>
                    <div className="w-1/4">
                        {/* <Divider /> */}
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMonthYear}</h2>
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaData title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                            <NeracaData title="BEBAN OPERASIONAL" titleTotal="Beban Operasional" type={5} group2={10} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL 2" />}>
                            <NeracaData title="BEBAN OPERASIONAL" titleTotal="Beban Sekretariat" type={5} group2={11} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL 3" />}>
                            <NeracaData title="BEBAN OPERASIONAL" titleTotal="Beban Bidang & Bapel" type={5} group2={12} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PENERIMAAN LAIN / KHUSUS" />}>
                            <NeracaData title="PENERIMAAN LAIN" titleTotal="Penerimaan Lain-lain/Khusus" type={4} group2={9} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="KENAIKAN/PENURUNAN AB" />}>
                            <NeracaDataSelisih title="KENAIKAN/PENURUNAN AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" />
                        </Suspense>

                        <Suspense fallback={<Loading section="ASET BERSIH AWAL" />}>
                            <NeracaData title="ASET BERSIH AWAL" titleTotal="Aset Bersih Awal" type={3} group2={6} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="ASET BERSIH AKHIR" />}>
                            <NeracaDataAkhir title="ASET BERSIH AKHIR" titleTotal="Aset Bersih Akhir" />
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

                        <Suspense fallback={<Loading section="MoM" />}>
                            <NeracaDataMoM row={8} />
                        </Suspense>

                    </div>

                </div>

                <div className="h-6"></div>
                <Divider />
                <h1 className="text-2xl font-bold dark:text-blue-500">ARUS KAS {titleMonthYear}</h1>
                <div className="flex flex-wrap">

                    {/* START ARUS KAS HERE */}
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

                    {/* END OF ARUS KAS */}

                </div>

                MonthYearSelector

            </div>

        </>
    )
}
