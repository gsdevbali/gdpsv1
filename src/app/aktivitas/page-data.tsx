"use client"

import { Suspense } from "react";

import Divider from "@/components/Divider";

import Loading from "./loading";
import NeracaData from "./neraca-data-new";
import NeracaDataX from "./hitung-ab-selisih";
//import WidgetInfoTotal from "./widget-info-total";
import { toQueryDate } from "@/lib/tanggal";
//import useNeracaNewContext from "@/context/neraca-new-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

export default function ShowNSData() {

    const { start, end, periodeOn } = useNeracaSaldoContext();
    console.log('SHOW-AKTIVITAS-DATA:')
    console.log('Start:', toQueryDate(start))
    console.log('End:', toQueryDate(end))
    console.log('Periode is: ', periodeOn)

    return (

        <>

            <div className="flex flex-wrap">

                <h1 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">LAPORAN AKTIVITAS Bulan: </h1>
                <Divider />

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
                    <NeracaDataX title="KENAIKAN/PENURUNAN AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" />
                </Suspense>

                <Suspense fallback={<Loading section="ASET BERSIH AWAL" />}>
                    <NeracaData title="ASET BERSIH AWAL" titleTotal="Aset Bersih Awal" type={3} group2={6} start={start} end={end} />
                </Suspense>


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

        </>
    )
}
