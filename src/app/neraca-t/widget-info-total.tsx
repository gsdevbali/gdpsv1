"use client"

import React from 'react'

import TulisTotalRpBig from '@/components/TulisTotalRpBig';
import TulisTotalRp from '@/components/TulisTotalRp';
import TulisTotalRpGreen from '@/components/TulisTotalRpGreen';
import TulisTotalRpRed from '@/components/TulisTotalRpRed';
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import { useNeracaStore } from './neraca-store';
import toidr from '@/lib/toidr';
import global from "@/config.js";

function WidgetInfoTotal() {

    const { totalAT1, totalAT2, totalAT3, totalAT4, totalAL, totalATL, totalAT, totalK, totalKL, totalAB, totalAB2, totalAP, setTotalAT } = useNeracaStore();
    const { titleMonthYear, titlePrevMonthYear } = useNeracaSaldoContext();

    const totAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
    const totATBersih = totalAT - totalAP;

    setTotalAT(totAT);

    const totalAktiva = totalAL + totalATL + totATBersih;
    const totalPasiva = totalK + totalKL + totalAB + totalAB2;

    {/* Selisih Aktiva dan Pasiva */ }
    const selisihAkhir = toidr(totalAktiva - totalPasiva)

    const isBalanceSheetEqual = (totalAktiva: number, totalPasiva: number) => {
        return totalAktiva === totalPasiva
    }


    return (


        <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
            {/* Rangkuman Neraca */}
            <h1 className="text-xl font-bold pt-4 pb-2">RANGKUMAN NERACA {titleMonthYear}</h1>
            {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>}



            <TulisTotalRp value={toidr(totalAL)} title="AKTIVA LANCAR" />
            <TulisTotalRp value={toidr(totalATL)} title="AKTIVA TIDAK LANCAR" />
            <TulisTotalRp value={toidr(totalAT)} title="AKTIVA TETAP" />

            <TulisTotalRp value={toidr(totalAP)} title="AKUMULASI PENYUSUTAN" />

            <TulisTotalRp value={toidr(totATBersih)} title="AKTIVA TETAP BERSIH (Aktiva Tetap - Akumulasi Penyusutan)" />

            <TulisTotalRpBig value={toidr(totalAktiva)} title="ASET" />

            <TulisTotalRp value={toidr(totalK)} title="KEWAJIBAN" />
            <TulisTotalRp value={toidr(totalKL)} title="KEWAJIBAN LANCAR" />
            <TulisTotalRp value={toidr(totalAB)} title="ASET BERSIH" />
            <TulisTotalRp value={toidr(totalAB2)} title="KENAIKAN/PENURUNAN ASET BERSIH" />
            <TulisTotalRp value={toidr(totalAB + totalAB2)} title="ASET BERSIH AKHIR (Aset Bersih + Kenaikan/Penurunan)" />

            <TulisTotalRpBig value={toidr(totalPasiva)} title="PASIVA (Kewajiban + Aset Bersih Akhir)" />

            {isBalanceSheetEqual(totalAktiva, totalPasiva) ?
                <TulisTotalRpGreen value={selisihAkhir} title="Selisih Aset dan Pasiva" />
                :
                <TulisTotalRpRed value={selisihAkhir} title="Selisih Aset dan Pasiva" />
            }
        </div>
    )

}

export default WidgetInfoTotal