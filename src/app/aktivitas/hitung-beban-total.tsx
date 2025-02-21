"use client"

import toidr from "@/lib/toidr";
// import { useCashflowRecStore } from './cashflowrec-store';
import SubTotalAktivitas from './total-aktivitas';
import useAktivitasContext from "@/context/aktivitas-context";

const NeracaDataBebanTotal = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalBebanOp, totalBeban2, totalBeban3 } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);

    //Set Total Pendapatan/Penerimaan
    //setTotalTerimaAll(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataBebanTotal;

//export default