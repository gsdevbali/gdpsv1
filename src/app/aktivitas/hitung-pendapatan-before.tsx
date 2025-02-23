"use client"

import toidr from "@/lib/toidr";
import { useCashflowRecStoreBefore } from './cashflowrec-store-before';
import SubTotalAktivitas from './total-aktivitas';
import useAktivitasContext from "@/context/aktivitas-context";

const NeracaDataPendapatanBefore = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerima1X, totalTerima2X } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalTerima1X + totalTerima2X);

    //Set Total Pendapatan/Penerimaan
    //setTotalTerimaAllX(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataPendapatanBefore;

//export default