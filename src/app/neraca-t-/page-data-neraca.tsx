"use client"

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import Loading from "./loading";
import JustTitle from "./just-title";
import NeracaData from "./neraca-data-current";
import NeracaDataBefore from "./neraca-data-before";
import NeracaDataGroup2Before from "./neraca-data-before-group2";


export default function ShowNSDataNew() {

    const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();

    return (

        <>
            <div className="grid grid-cols-2 gap-4">
                {/* KOLOM 1 */}
                <div className="grid grid-cols-3">
                    <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKTIVA LANCAR</h2>
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titlePrevMonthYear}</h2>
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMonthYear}</h2>
                </div>
                {/* KOLOM 2 */}
                <div className="grid grid-cols-3">
                    <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">KEWAJIBAN & ASET BERSIH</h2>
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titlePrevMonthYear}</h2>
                    <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">{titleMonthYear}</h2>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">

                <div className="grid grid-cols-3">

                    <div>

                        <JustTitle title="KAS" />
                        <JustTitle title="BANK" />
                        <JustTitle title="Deposito" />
                        <JustTitle title="Piutang" />
                        <JustTitle title="Piutang Lain-Lain" />
                        <JustTitle title="Biaya Dibayar Dimuka" />
                        <br />
                        <JustTitle title="TOTAL AKTIVA LANCAR" />
                        <br />
                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKTIVA TIDAK LANCAR</h2>
                        <JustTitle title="Bangunan Dalam Penyelesaian" />

                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">AKTIVA TETAP</h2>
                        <JustTitle title="Tanah" />
                        <JustTitle title="Gedung" />
                        <JustTitle title="Kendaraan" />
                        <JustTitle title="Inventaris" />

                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Akumulasi Penyusutan</h2>

                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">Aktiva Tetap Bersih</h2>

                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">JUMLAH ASET</h2>



                    </div>

                    <div>
                        <Suspense fallback={<Loading section="KAS" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={1} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BANK" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="DEPOSITO" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={3} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PIUTANG" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={1} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PIUTANG LAIN" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BON SEM" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={4} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BIAYA D MUKA" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={3} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="TOTAL AL" />}>
                            <NeracaDataGroup2Before title="" titleTotal="" type={1} group={1} start={startPrev} end={endPrev} />
                        </Suspense>
                    </div>

                    <div>
                        <Suspense fallback={<Loading section="KAS" />}>
                            <NeracaData title="" titleTotal="" type={1} group={1} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BANK" />}>
                            <NeracaData title="" titleTotal="" type={1} group={2} start={start} end={end} />
                        </Suspense>
                    </div>


                </div>

                <div className="grid grid-cols-3">

                    <div>

                        <JustTitle title="Hutang Biaya" />
                        <JustTitle title="Hutang Lain-lain" />

                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">ASET BERSIH</h2>
                        <JustTitle title="Aset Bersih Awal" />
                        <JustTitle title="Kenaikan ( Penurunan ) Aset Bersih" />

                        <h2 className="text-start text-blue-600 dark:text-orange-600 font-bold">JUMLAH KEWAJIBAN & ASET BERSIH</h2>

                    </div>

                    <div>
                        <Suspense fallback={<Loading section="KAS" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={1} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BANK" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={2} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="DEP" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={3} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PJ" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={6} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PK" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={7} start={startPrev} end={endPrev} />
                        </Suspense>

                        <Suspense fallback={<Loading section="PL" />}>
                            <NeracaDataBefore title="" titleTotal="" type={1} group={8} start={startPrev} end={endPrev} />
                        </Suspense>
                    </div>

                    <div>
                        <Suspense fallback={<Loading section="KAS" />}>
                            <NeracaData title="" titleTotal="" type={1} group={1} start={start} end={end} />
                        </Suspense>

                        <Suspense fallback={<Loading section="BANK" />}>
                            <NeracaData title="" titleTotal="" type={1} group={2} start={start} end={end} />
                        </Suspense>
                    </div>

                </div>




            </div>

            <div className="h-4"></div>

            {/* TOTAL Info */}
            {/* <WidgetInfoTotal /> */}



        </>
    )
}
