"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitas from './total-aktivitas';

const NeracaDataPendapatan = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalTerima1, totalTerima2 } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalTerima1 + totalTerima2);

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
