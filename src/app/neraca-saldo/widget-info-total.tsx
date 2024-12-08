"use client"

import React from 'react'

import TulisTotalRp from '@/components/TulisTotalRp'
import { useNeracaStore } from './neraca-store'
import toidr from '@/lib/toidr'
import global from "@/config.js";

function WidgetInfoTotal() {

    const { totalAL, totalATL, totalAT, totalK, totalKL, totalAB } = useNeracaStore();

    const totalAktiva = totalAL + totalATL + totalAT;
    const totalPasiva = totalK + totalKL + totalAB;

    {/* Selisih Aktiva dan Pasiva */ }
    const selisihAkhir = toidr(totalAktiva - totalPasiva)

    const isBalanceSheetEqual = (totalAktiva: number, totalPasiva: number) => {
        return totalAktiva === totalPasiva
    }

    return (
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
            {/* Rangkuman Neraca */}
            <h1 className="text-xl font-bold pt-4 pb-2">RANGKUMAN NERACA</h1>
            {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>}

            <TulisTotalRp value={toidr(totalAktiva)} title="ASET" />
            <TulisTotalRp value={toidr(totalPasiva)} title="PASIVA (Kewajiban + Aset Bersih)" />

            <TulisTotalRp value={selisihAkhir} title="Selisih Aset dan Pasiva" />
        </div>
    )

}

export default WidgetInfoTotal