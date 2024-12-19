"use client"

import React from 'react'
import useCashFlowContext from '@/context/cashflow-context';
import ShowCFData from './page-data';
import { getMonth } from '@/lib/tanggal';


//const CashFlowData = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number, start:string, end:string }) => {
const BeforePageData = ({ isOK, month }: { isOK: boolean; month: number }) => {


    const { start, end, periodeOn } = useCashFlowContext();
    const monthName = getMonth(month)
    return (
        <>
            {/* <h2>--CHECK--</h2>

            {(isOK) ? <h2>READY</h2> : <h2>NOT READY</h2>}
            <h2>Selected Month: {monthName}</h2>
            <h2>Start: {start}</h2>
            <h2>End: {end}</h2>

            <h2>--END-CHECK--</h2> */}

            {/* {(isOK?)<ShowCFData /> : <h2>Nope!</h2> */}
            {isOK && <ShowCFData />}

        </>
    )
}

export default BeforePageData