"use client"

import { Suspense } from "react";

import Divider from "@/components/Divider";

import Loading from "./loading";
import NeracaData from "./neraca-data-new";
import WidgetInfoTotal from "./widget-info-total";
import { toQueryDate } from "@/lib/tanggal";
//import useNeracaNewContext from "@/context/neraca-new-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import NeracaDataX from "./neraca-dataX";
import NeracaDataAllgroup from "./neraca-data-allgroup";
import NeracaDataAllgroupX from "./neraca-data-allgroupX";

export default function ShowNSData() {

    // const { start, end, periodeOn, titlePrevMonthYear, titleMonthYear } = useNeracaSaldoContext();
    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();

    console.log('SHOW-NS-DATA:')
    console.log('Start:', toQueryDate(start))
    console.log('End:', toQueryDate(end))
    //console.log('Periode is: ', periodeOn)

    return (

        <>

            {/* <div className="flex flex-wrap"> */}
            <div className="grid grid-cols-2 gap-4">

                {/* <div className="w-1/2 pr-4"> */}
                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="flex flex-row gap-4">

                    <div className="basis-4/5">
                        {/* AKTIVA - KIRI */}

                        <div className="flex justify-between">
                            <h1 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">AKTIVA</h1>
                            <h1 className="text-[1.2em] text-gray-400 pt-4 pb-2">{titlePrevMonthYear}</h1>
                        </div>
                        <Divider />

                        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaDataX title="AKTIVA LANCAR" titleTotal="Aktiva Lancar" type={1} group2={1} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataX title="AKTIVA TIDAK LANCAR" titleTotal="Aktiva Tidak Lancar" type={1} group2={3} start={startPrev} end={endPrev} />
                        </Suspense>

                        {/* <Suspense fallback={<Loading section="AKTIVA TETAP" />}> */}
                        {/* <AktivaTidakLancar /> */}
                        {/* <NeracaDataX title="AKTIVA TETAP" titleTotal="Aktiva Tetap" type={1} group2={2} start={startPrev} end={endPrev} /> */}
                        {/* </Suspense> */}

                        <Suspense fallback={<Loading section="AT1" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroupX title="AKTIVA TETAP - TANAH" titleTotal="Tanah" type={1} group={10} group2={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AT2" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroupX title="AKTIVA TETAP - BANGUNAN" titleTotal="Bangunan" type={1} group={11} group2={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AT3" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroupX title="AKTIVA TETAP - KENDARAAN" titleTotal="Kendaraan" type={1} group={12} group2={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AT4" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroupX title="AKTIVA TETAP - INVENTARIS" titleTotal="Inventaris" type={1} group={13} group2={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="Akumulasi Penyusutan" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroupX title="AKUMULASI PENYUSUTAN" titleTotal="Akumulasi Penyusutan" type={1} group={14} group2={2} start={startPrev} end={endPrev} />
                        </Suspense>
                    </div>
                    <div className="basis-1/4">
                        <h1 className="text-right text-[1.2em] pt-4 pb-2 text-blue-600 dark:text-orange-500">{titleMonthYear}</h1>
                        <Divider />

                        {/* Judul Aktiva Lancar - current */}
                        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaData title='AL' titleTotal="Aktiva Lancar" type={1} group2={1} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AKTIVA T-LANCAR" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaData title="AKTIVA TL" titleTotal="Aktiva Tidak Lancar" type={1} group2={3} start={start} end={end} />
                        </Suspense>


                        {/* <Suspense fallback={<Loading section="AKTIVA TETAP" />}> */}
                        {/* <AktivaTidakLancar /> */}
                        {/* <NeracaData title="AKTIVA TETAP" titleTotal="Aktiva Tetap" type={1} group2={2} start={start} end={end} /> */}
                        {/* </Suspense> */}

                        <Suspense fallback={<Loading section="AT1" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroup title="Test" titleTotal="Tanah" type={1} group={10} group2={2} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AT2" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroup title="Test" titleTotal="Bangunan" type={1} group={11} group2={2} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AT3" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroup title="Test" titleTotal="Kendaraan" type={1} group={12} group2={2} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="AT4" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroup title="Test" titleTotal="Inventaris" type={1} group={13} group2={2} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="Akumulasi Penyusutan" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaDataAllgroup title="AK.PENY." titleTotal="Akumulasi Penyusutan" type={1} group={14} group2={2} start={start} end={end} />
                        </Suspense>
                    </div>


                </div>

                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="flex flex-row gap-3">
                    {/* <div className="w-1/2"> */}
                    {/* PASIVA - KANAN */}

                    <div className="basis-4/5">

                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">KEWAJIBAN DAN ASET BERSIH</h2>
                            <h1 className="text-[1.2em] text-gray-400 pt-4 pb-2">{titlePrevMonthYear}</h1>
                        </div>
                        <Divider />

                        {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN</h2> */}
                        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                            <NeracaDataX title="KEWAJIBAN" titleTotal="Kewajiban" type={2} group2={4} start={startPrev} end={endPrev} />
                        </Suspense>

                        {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN LANCAR</h2> */}
                        <Suspense fallback={<Loading section="KEWAJIBAN LANCAR" />}>
                            <NeracaDataX title="KEWAJIBAN LANCAR" titleTotal="Kewajiban Lancar" type={2} group2={5} start={startPrev} end={endPrev} />
                        </Suspense>

                        {/* <h2 className="text-lg font-bold pt-2 pb-2">ASET BERSIH</h2> */}
                        <Suspense fallback={<Loading section="ASET BERSIH" />}>
                            <NeracaDataX title="ASET BERSIH" titleTotal="Aset Bersih" type={3} group2={6} start={startPrev} end={endPrev} />
                            {/* <NeracaDataSub title="ASET BERSIH 2" titleTotal="Aset Bersih 2" type={3} group2={7} /> */}
                            <NeracaDataX title="Kenaikan (Penurunan)" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group2={7} start={startPrev} end={endPrev} />
                        </Suspense>
                    </div>

                    <div className="basis-1/4">
                        <h2 className="text-right text-[1.2em] pt-4 pb-2 text-blue-600 dark:text-orange-500">{titleMonthYear}</h2>
                        <Divider />

                        {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN</h2> */}
                        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                            <NeracaData title="KEWAJIBAN" titleTotal="Kewajiban" type={2} group2={4} start={start} end={end} />
                        </Suspense>

                        {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN LANCAR</h2> */}
                        <Suspense fallback={<Loading section="KEWAJIBAN LANCAR" />}>
                            <NeracaData title="KL" titleTotal="Kewajiban Lancar" type={2} group2={5} start={start} end={end} />
                        </Suspense>

                        {/* <h2 className="text-lg font-bold pt-2 pb-2">ASET BERSIH</h2> */}
                        <Suspense fallback={<Loading section="ASET BERSIH" />}>
                            <NeracaData title="ASET BERSIH" titleTotal="Aset Bersih Awal" type={3} group2={6} start={start} end={end} />
                            {/* <NeracaDataSub title="ASET BERSIH 2" titleTotal="Aset Bersih 2" type={3} group2={7} /> */}
                            <NeracaData title="AB2" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group2={7} start={start} end={end} />
                        </Suspense>
                    </div>

                </div>

            </div>


            <div className="h-4"></div>

            {/* TOTAL Info */}
            <WidgetInfoTotal />

        </>
    )
}
