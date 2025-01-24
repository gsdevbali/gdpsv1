"use client"

import toidr from "@/lib/toidr";
import { useCashflowRecStoreBefore } from "./cashflowrec-store-before";
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSurplus1Before = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerimaAllX, totalBebanOpX, setTotalSurplus1X } = useCashflowRecStoreBefore();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalTerimaAllX - totalBebanOpX);

    //Set Total Pendapatan/Penerimaan
    setTotalSurplus1X(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataSurplus1Before;

//export default