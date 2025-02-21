"use client"

import toidr from "@/lib/toidr";
import { useCashflowRecStore } from './cashflowrec-store';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataPendapatan = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerima1, totalTerima2, setTotalTerimaAll } = useCashflowRecStore();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalTerima1 + totalTerima2);

    //Set Total Pendapatan/Penerimaan
    setTotalTerimaAll(newTotal);

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataPendapatan;

//export default