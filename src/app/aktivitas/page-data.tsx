"use client"

import { Suspense } from "react";

import { toQueryDate } from "@/lib/tanggal";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaData from "./neraca-data-current";
import NeracaDataBefore from "./neraca-data-before";
import NeracaDataSelisih from "./hitung-ab-selisih";
import NeracaDataSelisihBefore from "./hitung-ab-selisih-before";
import NeracaDataAkhir from "./hitung-ab-akhir";
import NeracaDataAkhirBefore from "./hitung-ab-akhir-before";

//import WidgetInfoTotal from "./widget-info-total";
//import useNeracaNewContext from "@/context/neraca-new-context";

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

                    {/* <h1 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">LAPORAN AKTIVITAS Bulan: </h1> */}



                    <div className="w-1/2">
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKUN</h2>
                        <JustTitle title="Penerimaan Persembahan" />
                        <JustTitle title="Beban Operasional" />
                        <JustTitle title="Penerimaan Lain-lain/Khusus" />
                        <JustTitle title="Kenaikan (Penurunan) Aset Bersih" />
                        <JustTitle title="Aset Bersih Awal" />
                        <JustTitle title="Aset Bersih Akhir" />
                    </div>
                    <div className="w-1/4">
                        <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titlePrevMonthYear}</h2>
                        <Suspense fallback={<Loading section="PENERIMAAN PERSEMBAHAN" />}>
                            <NeracaDataBefore title="PENERIMAAN PERSEMBAHAN" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BEBAN OPERASIONAL" />}>
                            <NeracaDataBefore title="BEBAN OPERASIONAL" titleTotal="Beban Operasional" type={5} group2={10} start={startPrev} end={endPrev} />
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
