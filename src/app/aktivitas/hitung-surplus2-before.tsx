"use client"

import toidr from "@/lib/toidr";
import { useCashflowRecStoreBefore } from './cashflowrec-store-before';
import SubTotalAktivitas from './total-aktivitas';
import useAktivitasContext from "@/context/aktivitas-context";

const NeracaDataSurplus2Before = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const totalPendapatan = Math.abs(totalTerima1X + totalTerima2X);
    const totalBeban = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);
    const newTotal = Math.abs(totalPendapatan - totalBeban);

    //Set Total Pendapatan/Penerimaan
    //setTotalSurplus2X(newTotal);

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