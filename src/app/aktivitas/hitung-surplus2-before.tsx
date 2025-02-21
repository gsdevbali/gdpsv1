"use client"

import toidr from "@/lib/toidr";
import { useCashflowRecStoreBefore } from './cashflowrec-store-before';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSurplus2Before = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSurplus1X, totalBebanPsuX, setTotalSurplus2X } = useCashflowRecStoreBefore();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalSurplus1X - totalBebanPsuX);

    //Set Total Pendapatan/Penerimaan
    setTotalSurplus2X(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataSurplus2Before;

//export default