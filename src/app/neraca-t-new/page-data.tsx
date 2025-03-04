"use client"

import { Suspense } from "react";

import { toQueryDate } from "@/lib/tanggal";
import Divider from "@/components/Divider";
import useAktivitasContext from "@/context/aktivitas-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import NeracaData from "./neraca-data";
import WidgetInfoTotal from "./widget-info-total";
import WidgetInfoTotalNew from "./widget-info-total-new";

import NeracaDataX from "./neraca-dataX";
import NeracaDataSub from "./neraca-data-sub";
import NeracaDataSubX from "./neraca-data-subX";
import NeracaDataABX from "./neraca-data-ABX";
import NeracaDataAB from "./neraca-data-AB";
import NeracaDataSelisih from "../aktivitas/hitung-ab-selisih";
import AktivitasSelisihAB from "./hitung-aktivitas";


export default function ShowNSData() {

    // const { start, end, periodeOn, titlePrevMonthYear, titleMonthYear } = useNeracaSaldoContext();
    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    const { totalSelisihAB } = useAktivitasContext();


    console.log('SHOW-NS-DATA:')
    console.log('Start:', toQueryDate(start))
    console.log('End:', toQueryDate(end))
    //console.log('Periode is: ', periodeOn)

    const startFirst = "2020-01-01"

    return (

        <>

            <div className="grid grid-cols-2 gap-4">

                <div className="flex flex-row gap-4">

                    <div className="basis-4/5">
                        {/* AKTIVA - KIRI */}
                        {/* --------------------------------------------- */}
                        <div className="flex justify-between">
                            <h1 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">AKTIVA</h1>
                            <h1 className="text-[1.2em] text-gray-400 pt-4 pb-2">{titlePrevMonthYear}</h1>
                        </div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">AKTIVA LANCAR</h2>
                        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaDataX title="AL" titleTotal="KAS" type={1} group={1} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="BANK" type={1} group={2} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AL" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="AL" titleTotal="Aktiva Lancar" type={1} group={1} start={startFirst} end={endPrev} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">AKTIVA TIDAK LANCAR</h2>
                        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaDataX title="ATL" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={endPrev} />
                            <NeracaDataX title="ATL" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="ATL" titleTotal="ATL" type={1} group={3} start={startFirst} end={endPrev} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">AKTIVA TETAP</h2>
                        <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaDataX title="AT" titleTotal="TANAH" type={1} group={10} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AT" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AT" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={endPrev} />
                            <NeracaDataX title="AT" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={endPrev} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">PENYUSUTAN</h2>
                        <Suspense fallback={<Loading section="AP" />}>
                            {/* <AkumPenyusutan /> */}
                            <NeracaDataX title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="AP" titleTotal="Aktiva P" type={1} group={14} start={startFirst} end={endPrev} />
                        </Suspense>


                    </div>
                    <div className="basis-2/5">
                        <h1 className="text-right text-[1.2em] pt-4 pb-2 text-blue-600 dark:text-orange-500">{titleMonthYear}</h1>
                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA LANCAR</h2>
                        <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaData title="AKTIVA LANCAR" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={end} />
                            <NeracaData title="AKTIVA LANCAR" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={end} />
                            <NeracaData title="AL" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={end} />

                            <NeracaDataSub title="AKTIVA LANCAR" titleTotal="Aktiva Lancar" type={1} group={1} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA-T-L</h2>
                        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaData title="ATL" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={end} />
                            <NeracaData title="ATL" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={end} />

                            <NeracaDataSub title="ATL" titleTotal="ATL" type={1} group={3} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA TETAP</h2>
                        <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaData title="AT" titleTotal="TANAH" type={1} group={10} start={startFirst} end={end} />
                            <NeracaData title="AT" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={end} />
                            <NeracaData title="AT" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={end} />
                            <NeracaData title="AT" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={end} />

                            <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">PENYUSUTAN</h2>
                        <Suspense fallback={<Loading section="AP" />}>
                            {/* <AkumPenyusutan /> */}
                            <NeracaData title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={end} />

                            <NeracaDataSub title="AP" titleTotal="AP" type={1} group={14} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-4"></div>

                    </div>



                </div>

                <div className="flex flex-row gap-3">

                    {/* PASIVA - KANAN */}
                    {/* --------------------------------------------- */}
                    <div className="basis-4/5">

                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500">KEWAJIBAN & ASET BERSIH</h2>
                            <h1 className="text-[1.2em] text-gray-400 pt-4 pb-2">{titlePrevMonthYear}</h1>
                        </div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">KEWAJIBAN</h2>
                        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                            <NeracaDataX title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={endPrev} />
                            <NeracaDataX title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={endPrev} />
                            <NeracaDataX title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={endPrev} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">ASET BERSIH</h2>
                        <Suspense fallback={<Loading section="AB" />}>
                            <NeracaDataABX title="AB" titleTotal="Aset Bersih" type={3} group={6} start={startFirst} end={endPrev} />

                            {/* <NeracaDataSubX title="AB" titleTotal="AB" type={3} group={6} start={startPrev} end={endPrev} /> */}
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <div className="h-2"></div>
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">KENAIKAN (PENURUNAN) ASET BERSIH</h2>
                        <Suspense fallback={<Loading section="AB" />}>
                            <NeracaDataABX title="AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={endPrev} />

                            {/* <NeracaDataSubX title="KW" titleTotal="KW" type={2} group={6} start={startPrev} end={endPrev} /> */}
                            {/* <NeracaDataSelisih title="KENAIKAN/PENURUNAN AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" /> */}
                        </Suspense>

                        <div className="h-2"></div>

                    </div>

                    <div className="basis-1/3">

                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500 opacity-0">K&AB</h2>
                            <h1 className="text-right text-[1.2em] pt-4 pb-2 text-blue-600 dark:text-orange-500">{titleMonthYear}</h1>
                        </div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">KEWAJIBAN</h2>
                        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                            <NeracaData title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
                            <NeracaData title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
                            <NeracaData title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />

                            <NeracaDataSub title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">ASET BERSIH</h2>
                        <Suspense fallback={<Loading section="AB" />}>
                            <NeracaDataAB title="AB" titleTotal="Aset Bersih" type={3} group={6} start={startFirst} end={end} />

                            {/* <NeracaDataSub title="AB" titleTotal="AB" type={2} group={14} start={start} end={end} /> */}
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <div className="h-2"></div>
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">K&AB</h2>
                        <Suspense fallback={<Loading section="AB" />}>
                            <NeracaDataAB title="AB2" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={end} />

                            {/* Hitung Selisih ambil dari Hitungan NERACA-T */}
                            {/* <h2>{totalSelisihAB}</h2> */}
                            {/* <NeracaDataSub title="AB2" titleTotal="AB2" type={3} group={6} start={start} end={end} /> */}
                            {/* <AktivitasSelisihAB title="KENAIKAN/PENURUNAN AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" /> */}
                            {/* TODO: 
                            - HITUNG SELISIH PENERIMAAN/BIAYA */}
                        </Suspense>

                        <div className="h-2"></div>

                    </div>

                </div>

            </div>

            <Divider />


            <div className="h-4"></div>

            {/* TOTAL Info */}
            {/* <WidgetInfoTotal /> */}
            <WidgetInfoTotalNew />

        </>
    )
}
