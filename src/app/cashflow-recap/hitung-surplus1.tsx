"use client"

import toidr from "@/lib/toidr";
import { useCashflowRecStore } from './cashflowrec-store';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSurplus1 = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerimaAll, totalBebanOp, setTotalSurplus1 } = useCashflowRecStore();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalTerimaAll - totalBebanOp);

    //Set Total Pendapatan/Penerimaan
    setTotalSurplus1(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataSurplus1;

//export default