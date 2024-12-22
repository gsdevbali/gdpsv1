"use client"

import { Suspense } from "react";

import Divider from "@/components/Divider";

import Loading from "./loading";
import NeracaData from "./neraca-data-new";
import WidgetInfoTotal from "./widget-info-total";
import { toQueryDate } from "@/lib/tanggal";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

export default function ShowNSData() {

    const { start, end, periodeOn } = useNeracaSaldoContext();
    console.log('SHOW-NS-DATA:')
    console.log('Start:', toQueryDate(start))
    console.log('End:', toQueryDate(end))
    console.log('Periode is: ', periodeOn)

    return (

        <>

            {/* AKTIVA - KIRI */}
            <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">AKTIVA</h1>
            <Divider />

            <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                {/* <AktivaLancar /> */}
                <NeracaData title="AKTIVA LANCAR" titleTotal="Aktiva Lancar" type={1} group2={1} start={start} end={end} />
            </Suspense>

            <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
                {/* <AktivaTidakLancar /> */}
                <NeracaData title="AKTIVA TIDAK LANCAR" titleTotal="Aktiva Tidak Lancar" type={1} group2={3} start={start} end={end} />
            </Suspense>

            <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
                {/* <AktivaTidakLancar /> */}
                <NeracaData title="AKTIVA TETAP" titleTotal="Aktiva Tetap" type={1} group2={2} start={start} end={end} />
            </Suspense>

            {/* PASIVA - KANAN */}

            <h2 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">KEWAJIBAN DAN ASET BERSIH</h2>
            <Divider />

            {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN</h2> */}
            <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                <NeracaData title="KEWAJIBAN" titleTotal="Kewajiban" type={2} group2={4} start={start} end={end} />
            </Suspense>

            {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN LANCAR</h2> */}
            <Suspense fallback={<Loading section="KEWAJIBAN LANCAR" />}>
                <NeracaData title="KEWAJIBAN LANCAR" titleTotal="Kewajiban Lancar" type={2} group2={5} start={start} end={end} />
            </Suspense>

            {/* <h2 className="text-lg font-bold pt-2 pb-2">ASET BERSIH</h2> */}
            <Suspense fallback={<Loading section="ASET BERSIH" />}>
                <NeracaData title="ASET BERSIH" titleTotal="Aset Bersih" type={3} group2={6} start={start} end={end} />
                {/* <NeracaDataSub title="ASET BERSIH 2" titleTotal="Aset Bersih 2" type={3} group2={7} /> */}
                <NeracaData title="ASET BERSIH 2" titleTotal="Aset Bersih 2" type={3} group2={7} start={start} end={end} />
            </Suspense>

            <div className="h-4"></div>

            {/* TOTAL Info */}
            <WidgetInfoTotal />

        </>
    )
}
