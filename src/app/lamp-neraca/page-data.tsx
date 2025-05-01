"use client"

import { Suspense } from "react";
import { useQuery } from '@tanstack/react-query';
import { Spinner } from "@/components/ui/spinner";

import { toQueryDate } from "@/lib/tanggal";
import toidr from "@/lib/toidr";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";

import useAktivitasContext from "@/context/aktivitas-context";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import useNeracaTContext from "@/context/neraca-t-context";

//import WidgetInfoTotal from "./widget-info-total";
//import WidgetInfoTotalNew from "./widget-info-total-new";

import NeracaData from "./neraca-data";
import NeracaDataX from "./neraca-dataX";
import NeracaDataSub from "./neraca-data-sub";
import NeracaDataSubX from "./neraca-data-subX";
import NeracaDataABX from "./neraca-data-ABX";
import NeracaDataAB from "./neraca-data-AB";
import NeracaDataAP from "./neraca-data-ap";
import NeracaDataAPX from "./neraca-data-apX";
//import NeracaDataSelisih from "../aktivitas/hitung-ab-selisih";
//import AktivitasSelisihAB from "./hitung-aktivitas";
//import SubTotalRekap from "../neraca-saldo-nom/total-rekap";
import SubTotalAB from "./total-ab";
import SubTotalABX from "./total-abX";
import SubTotalAll from "./total-all";
import NeracaDataTotalAT from "./neraca-data-total-at";
import NeracaDataTotalATX from "./neraca-data-total-atX";
import NeracaDataDetail from "./neraca-data-detail";
import NeracaDataDetailX from "./neraca-data-detailX";


export default function ShowNSData() {

    // const { start, end, periodeOn, titlePrevMonthYear, titleMonthYear } = useNeracaSaldoContext();
    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();
    //const { totalSelisihAB } = useAktivitasContext();

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
                            <NeracaDataDetailX title="AL" titleTotal="KAS" type={1} group={1} start={startFirst} end={endPrev} />
                            {/* <NeracaDataSubX title="AL" titleTotal="KAS" type={1} group={1} start={startFirst} end={endPrev} /> */}
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="BANK" type={1} group={2} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="BANK" type={1} group={2} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="DEPO" type={1} group={3} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="BON-SBID" type={1} group={4} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="BON-SBAP" type={1} group={5} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="PIU-K" type={1} group={6} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="PIU-J" type={1} group={7} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="PIU-R" type={1} group={8} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AL" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AL" titleTotal="BIY-DD" type={1} group={9} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="AL" titleTotal="Aktiva Lancar" type={1} group={1} start={startFirst} end={endPrev} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">AKTIVA TIDAK LANCAR</h2>
                        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaDataX title="ATL" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="ATL" titleTotal="TDP" type={1} group={15} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="ATL" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="ATL" titleTotal="GDP" type={1} group={16} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="ATL" titleTotal="ATL" type={1} group={3} start={startFirst} end={endPrev} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">AKTIVA TETAP</h2>
                        <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaDataX title="AT" titleTotal="TANAH" type={1} group={10} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AT" titleTotal="TN" type={1} group={10} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AT" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AT" titleTotal="BN" type={1} group={11} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AT" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AT" titleTotal="KN" type={1} group={12} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="AT" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="AT" titleTotal="IN" type={1} group={13} start={startFirst} end={endPrev} />

                            {/* <NeracaDataSubX title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={endPrev} /> */}
                            <NeracaDataTotalATX title="Aktiva Tetap" start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500">PENYUSUTAN</h2>
                        <Suspense fallback={<Loading section="AP" />}>
                            {/* <AkumPenyusutan /> */}
                            {/* <NeracaDataX title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={endPrev} />
                            <NeracaDataSubX title="AP" titleTotal="Aktiva P" type={1} group={14} start={startFirst} end={endPrev} /> */}
                            <NeracaDataAPX title="Akumulasi Penyusutan" titleTotal="AKUMULASI PENYUSUTAN" start={startFirst} end={endPrev} />
                            <Divider />
                        </Suspense>

                    </div>


                    <div className="basis-2/5">
                        <h1 className="text-right text-[1.2em] pt-4 pb-2 text-blue-600 dark:text-orange-500">{titleMonthYear}</h1>
                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA LANCAR</h2>
                        <Suspense fallback={<Loading section="AKTIVA LANCAR - CURRENT" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaData title="AKTIVA LANCAR" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="KAS" type={1} group={1} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="BANK" type={1} group={2} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="DEPOSITO" type={1} group={3} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="DEPO" type={1} group={3} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="BON SEMENTARA BIDANG" type={1} group={4} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="BON-SBID" type={1} group={4} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="BON SEMENTARA BAPEL" type={1} group={5} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="BON-SBAP" type={1} group={5} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="PIUTANG KARYAWAN" type={1} group={6} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="PIU-K" type={1} group={6} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="PIUTANG JEMAAT" type={1} group={7} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="PIU-J" type={1} group={7} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AKTIVA LANCAR" titleTotal="PIUTANG RELOKASI" type={1} group={8} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="PIU-R" type={1} group={8} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AL" titleTotal="BIAYA DIBAYAR DIMUKA" type={1} group={9} start={startFirst} end={end} />
                            <NeracaDataDetail title="AL" titleTotal="BIY-BDM" type={1} group={9} start={startFirst} end={end} />

                            <NeracaDataSub title="AKTIVA LANCAR" titleTotal="Aktiva Lancar" type={1} group={1} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA-T-L</h2>
                        <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR - CURRENT" />}>
                            {/* <AktivaTidakLancar /> */}
                            <NeracaData title="ATL" titleTotal="TANAH DALAM PENYELESAIAN" type={1} group={15} start={startFirst} end={end} />
                            <NeracaDataDetail title="ATL" titleTotal="TDP" type={1} group={15} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="ATL" titleTotal="GEDUNG DALAM PENYELESAIAN" type={1} group={16} start={startFirst} end={end} />
                            <NeracaDataDetailX title="ATL" titleTotal="GDP" type={1} group={16} start={startFirst} end={end} />

                            <NeracaDataSub title="ATL" titleTotal="ATL" type={1} group={3} start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">AKTIVA TETAP</h2>
                        <Suspense fallback={<Loading section="AKTIVA TETAP - CURRENT" />}>
                            {/* <AktivaLancar /> */}
                            <NeracaData title="AT" titleTotal="TANAH" type={1} group={10} start={startFirst} end={end} />
                            <NeracaDataDetail title="AT" titleTotal="TN" type={1} group={10} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AT" titleTotal="BANGUNAN" type={1} group={11} start={startFirst} end={end} />
                            <NeracaDataDetail title="AT" titleTotal="BG" type={1} group={11} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AT" titleTotal="KENDARAAN" type={1} group={12} start={startFirst} end={end} />
                            <NeracaDataDetail title="AT" titleTotal="KN" type={1} group={12} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="AT" titleTotal="INVENTARIS" type={1} group={13} start={startFirst} end={end} />
                            <NeracaDataDetail title="AT" titleTotal="IN" type={1} group={13} start={startFirst} end={end} />

                            {/* <NeracaDataSub title="AT" titleTotal="AT" type={1} group={2} start={startFirst} end={end} /> */}
                            <NeracaDataTotalAT title="Aktiva Tetap" start={startFirst} end={end} />
                        </Suspense>

                        <div className="h-2"></div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">PENYUSUTAN</h2>
                        <Suspense fallback={<Loading section="AP" />}>
                            {/* <AkumPenyusutan /> */}
                            {/* <NeracaData title="AP" titleTotal="AKUMULASI PENYUSUTAN" type={1} group={14} start={startFirst} end={end} /> */}
                            <NeracaDataAP title="AP" titleTotal="AKUMULASI PENYUSUTAN - CURRENT" start={startFirst} end={end} />
                            <Divider />
                            {/* <NeracaDataSub title="AP" titleTotal="AP" type={1} group={14} start={startFirst} end={end} /> */}
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
                            <NeracaDataDetailX title="KW" titleTotal="HUT-B" type={2} group={16} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="KW" titleTotal="HUT-LL" type={2} group={17} start={startFirst} end={endPrev} />
                            <div className="h-2"/>
                            <NeracaDataX title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={endPrev} />
                            <NeracaDataDetailX title="KW" titleTotal="HUT-JP" type={2} group={18} start={startFirst} end={endPrev} />

                            <NeracaDataSubX title="KW" titleTotal="KW" type={2} group={4} start={startFirst} end={endPrev} />
                            {/* <NeracaDataDetailX title="KW" titleTotal="HUT-B" type={2} group={4} start={startFirst} end={endPrev} /> */}
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
                        {/* <Suspense fallback={<Loading section="AB2X" />}> */}
                        {/* <NeracaDataABX title="AB" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={endPrev} /> */}

                        <Suspense fallback={<Loading section="...Menghitung..." />}>
                            {/* Hitung AB */}
                            <HitungABX title="Penerimaan Persembahan" type={4} group2={8} start={startPrev} end={endPrev} />
                            <HitungABX title="Penerimaan Lain" type={4} group2={9} start={startPrev} end={endPrev} />
                            <HitungABX title="Biaya Operasional" type={5} group2={10} start={startPrev} end={endPrev} />
                            <HitungABX title="Biaya Sekre" type={5} group2={11} start={startPrev} end={endPrev} />
                            <HitungABX title="Biaya BidangBapel" type={5} group2={12} start={startPrev} end={endPrev} />
                        </Suspense>

                        {/* Show AB */}
                        <ShowABX title="Kenaikan (Penurunan) Aset Bersih" />

                        <Divider />
                        {/* </Suspense> */}

                        <div className="h-2"></div>

                    </div>

                    <div className="basis-1/3">

                        <div className="flex justify-between">
                            <p className="text-xl font-bold pt-4 pb-2 text-blue-600 dark:text-orange-500 opacity-0">X</p>
                            <h1 className="text-right text-[1.2em] pt-4 pb-2 text-blue-600 dark:text-orange-500">{titleMonthYear}</h1>
                        </div>

                        <Divider />
                        <h2 className="text-lg font-bold pt-2 pb-2 text-blue-600 dark:text-orange-500 opacity-0">KEWAJIBAN</h2>
                        <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                            <NeracaData title="KW" titleTotal="HUTANG BIAYA" type={2} group={16} start={startFirst} end={end} />
                            <NeracaDataDetail title="KW" titleTotal="HUT-B" type={2} group={16} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="KW" titleTotal="HUTANG LAIN-LAIN" type={2} group={17} start={startFirst} end={end} />
                            <NeracaDataDetail title="KW" titleTotal="HUT-B" type={2} group={17} start={startFirst} end={end} />
                            <div className="h-2"/>
                            <NeracaData title="KW" titleTotal="KEWAJIBAN JANGKA PANJANG" type={2} group={18} start={startFirst} end={end} />
                            <NeracaDataDetail title="KW" titleTotal="HUT-B" type={2} group={18} start={startFirst} end={end} />

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
                        {/* <Suspense fallback={<Loading section="AB2" />}> */}
                        {/* <NeracaDataAB title="AB2" titleTotal="Kenaikan (Penurunan) Aset Bersih" type={3} group={7} start={startFirst} end={end} /> */}

                        {/* Hitung AB */}
                        <Suspense fallback={<Loading section="...Menghitung..." />}>
                            <HitungAB title="Penerimaan Persembahan" type={4} group2={8} start={start} end={end} />
                            <HitungAB title="Penerimaan Lain" type={4} group2={9} start={start} end={end} />
                            <HitungAB title="Biaya Operasional" type={5} group2={10} start={start} end={end} />
                            <HitungAB title="Biaya Sekre" type={5} group2={11} start={start} end={end} />
                            <HitungAB title="Biaya BidangBapel" type={5} group2={12} start={start} end={end} />
                        </Suspense>

                        {/* Show AB */}
                        <ShowAB title="Kenaikan (Penurunan) Aset Bersih" />

                        <Divider />


                        {/* </Suspense> */}

                        <div className="h-2"></div>

                    </div>

                    
                </div>


            </div>
            
            <div className="h-8"></div>
            <Divider />

            <div className="flex justify-between bg-slate-200 dark:bg-blue-600 p-2">
            <div className="w-1/2 pr-2">
                <TotalAktiva />
            </div>
            <div className="w-1/2 pr-2">
                <TotalPasiva />
            </div>
            </div>

            <Divider />

            <div className="h-4"></div>

            {/* TOTAL Info */}
            {/* <WidgetInfoTotal /> */}
            {/* <WidgetInfoTotalNew /> */}

        </>
    )
}


//Show AB - current
function ShowAB({ title }: { title: string }) {

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3 } = useAktivitasContext();

    const totalPenerimaan = totalTerima1 + totalTerima2;
    const totalBiaya = totalBebanOp + totalBeban2 + totalBeban3;
    const totalSelisih = totalPenerimaan - (totalBiaya);

    return (
        <>
            <div className="w-full">
                <SubTotalAB value={toidr(totalSelisih)} title={title} />
            </div>
        </>
    )
}

//Show AB - previous
function ShowABX({ title }: { title: string }) {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContext();

    const totalPenerimaan = totalTerima1X + totalTerima2X;
    const totalBiaya = totalBebanOpX + totalBeban2X + totalBeban3X;
    const totalSelisih = totalPenerimaan - (totalBiaya);

    return (
        <>
            <div className="w-full">
                <SubTotalABX value={toidr(totalSelisih)} title={title} />
            </div>
        </>
    )
}

//Calculate current AB
function HitungAB({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) {

    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB,
        setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3, setTotalSelisihAB } = useAktivitasContext();
    //const { setTotalSelisihAB } = useAktivitasContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['ab', type, group2],
        queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div><Spinner size="small" /></div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    //Total & data for table
    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);

    //Set AB
    const totalTerima = totalTerima1+totalTerima2;
    const totalBeban = totalBebanOp+totalBeban2+totalBeban3;
    setTotalSelisihAB(totalTerima-totalBeban);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        //const newTotal = Math.abs(totalBalance);
        
        

        switch (group2) {

            case 8:
                setTotalTerima1(newTotal)
                break;
            case 9:
                setTotalTerima2(newTotal)
                break;
            case 10:
                setTotalBebanOp(newTotal)

            case 11:
                setTotalBeban2(newTotal)
                break;

            case 12:
                setTotalBeban3(newTotal)
                break;

            default:
                // Handle default case
                break;
        }

    };

    return (
        <>
        {/* <h1>SelisihAB: {toidr(totalSelisihAB)}</h1> */}
        </>
    )
}


//Calculate previous AB
function HitungABX({ title, type, group2, start, end }: { title: string; type: number; group2: number; start: string, end: string }) {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalSelisihABX,
        setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBeban2X, setTotalBeban3X, setTotalSelisihABX } = useAktivitasContext();
    // const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalSelisihAB,
        // setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3, setTotalSelisihAB } = useAktivitasContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['abx', type, group2],
        queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div><Spinner size="small" /></div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    //Total & data for table
    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);

    //Set AB
    const totalTerima = totalTerima1X+totalTerima2X;
    const totalBeban = totalBebanOpX+totalBeban2X+totalBeban3X;
    setTotalSelisihABX(totalTerima-totalBeban);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        //const newTotal = Math.abs(totalBalance);

        switch (group2) {

            case 8:
                setTotalTerima1X(newTotal)
                break;
            case 9:
                setTotalTerima2X(newTotal)
                break;
            case 10:
                setTotalBebanOpX(newTotal)

            case 11:
                setTotalBeban2X(newTotal)
                break;

            case 12:
                setTotalBeban3X(newTotal)
                break;

            default:
                // Handle default case
                break;
        }

    };

    return (
        <>

        </>
    )
}


//
function TotalAktiva() {

    const { totalAL, totalATL, totalAT1, totalAT2, totalAT3, totalAT4, totalAP } = useNeracaTContext();

    const totalAktiva = totalAL + totalATL + totalAT1 + totalAT2 + totalAT3 + totalAT4 + totalAP ;

    return (
        <>
            <SubTotalAll title="Total AKTIVA" value={toidr(totalAktiva)} />
        </>
    )
}


//
function TotalPasiva() {

    const { totalK, totalAB, totalAB2 } = useNeracaTContext();
    const { totalSelisihAB } = useAktivitasContext();

    const totalPasiva = totalK + totalAB + totalSelisihAB;

    return (
        <>
            <SubTotalAll title="Total PASIVA" value={toidr(totalPasiva)} />
        </>
    )
}