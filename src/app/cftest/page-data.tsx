import React, { Suspense } from 'react'
import Divider from '@/components/Divider'
import CashFlowData from './cashflow-data'
import Loading from './loading'
import useCashFlowContext from '@/context/cashflow-context';
import { toQueryDate } from '@/lib/tanggal';

function ShowCFData() {
    const { start, end, periodeOn } = useCashFlowContext();
    console.log('SHOW-CF-DATA:')
    console.log('Start:', toQueryDate(start))
    console.log('End:', toQueryDate(end))
    console.log('Periode is: ', periodeOn)
    
    return (
        <>
            {/* PENERIMAAN */}
            <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENERIMAAN</h1>
            <Divider />

            <Suspense fallback={<Loading section="Penerimaan Persembahan" />}>
                {/* <RugiLabaData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} /> */}
                <CashFlowData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} start={start} end={end}/>
            </Suspense>

            <Suspense fallback={<Loading section="Penerimaan Lain-lain" />}>
                <CashFlowData title="Penerimaan Lain-lain" titleTotal="Penerimaan Lain-lain" type={4} group2={9} start={start} end={end}/>
            </Suspense>


            {/* BEBAN / BIAYA2 */}
            <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENGELUARAN</h1>
            <Divider />

            <Suspense fallback={<Loading section="Biaya Operasional Gereja" />}>
                <CashFlowData title="Biaya Operasional Gereja" titleTotal="Biaya Operasional Gereja" type={5} group2={10} start={start} end={end}/>
            </Suspense>

            <Suspense fallback={<Loading section="Biaya Sekretariat" />}>
                <CashFlowData title="Biaya Sekretariat" titleTotal="Biaya Sekretariat" type={5} group2={11} start={start} end={end}/>
            </Suspense>

            <Suspense fallback={<Loading section="Biaya Bidang/Bapel" />}>
                <CashFlowData title="Biaya Bidang/Bapel" titleTotal="Biaya Bidang/Bapel" type={5} group2={12} start={start} end={end}/>
            </Suspense>


        </>
    )
}

export default ShowCFData