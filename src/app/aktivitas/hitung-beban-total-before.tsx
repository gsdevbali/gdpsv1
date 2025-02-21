"use client"

import toidr from "@/lib/toidr";
// import { useCashflowRecStore } from './cashflowrec-store';
import SubTotalAktivitas from './total-aktivitas';
import useAktivitasContext from "@/context/aktivitas-context";

const NeracaDataBebanTotalX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);

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

export default NeracaDataBebanTotalX;

//export default