"use client"

import React from 'react'

import TulisTotalRp from '@/components/TulisTotalRp'
import { useCfStore } from './cf-store'
import toidr from '@/lib/toidr'
import { Button } from '@/components/ui/button'


function InfoTotal() {

  const cfStore = useCfStore()

  return (
    <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
                    {/* Rangkuman Neraca */}
                    <h1 className="text-xl font-bold pt-4 pb-2">TOTAL / RANGKUMAN</h1>
                    {/* {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>} */}

                    {/* <Button onClick={() => cfStore.setTotalCf(cfStore.totalCf+100)}>SET TOTAL TEST</Button> */}
                    
                    {/* <TulisTotalRp value={toidr(cfStore.totalCf)} title="Total CF" /> */}

                    <TulisTotalRp value={'0'} title="Total Penerimaan" />
                    <TulisTotalRp value={'0'} title="Total Pengeluaran" />

                    {/* <TulisTotalRp value={selisihAkhir} title="Selisih Aset dan Pasiva" /> */}
                </div>
  )
}

export default InfoTotal