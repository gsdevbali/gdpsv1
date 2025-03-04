"use client"

import toidr from "@/lib/toidr";

import { useCashflowRecStore } from './cashflowrec-store';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSurplus2 = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSurplus1, totalBebanPsu, setTotalSurplus2 } = useCashflowRecStore();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalSurplus1 - totalBebanPsu);

    //Set Total Pendapatan/Penerimaan
    setTotalSurplus2(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />
            </div>
        </>
    )
}

export default NeracaDataSurplus2;
