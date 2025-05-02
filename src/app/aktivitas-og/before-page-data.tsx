"use client"

import React from 'react'

import { getMonth } from '@/lib/tanggal';
import useNeracaSaldoContext from '@/context/neraca-saldo-context';

import ShowNSData from './page-data';

//const CashFlowData = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number, start:string, end:string }) => {
const BeforePageData = ({ isOK, month }: { isOK: boolean; month: number }) => {

    const { start, end, periodeOn } = useNeracaSaldoContext();
    const monthName = getMonth(month)
    return (
        <>
            {isOK && <ShowNSData />}
        </>
    )
}

export default BeforePageData