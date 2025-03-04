"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitas from './total-aktivitas';

const NeracaDataBebanTotalX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalBebanOpX, totalBeban2X, totalBeban3X } = useAktivitasContext();

    //Hitung Total Pendapatan/Penerimaan
    const newTotal = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);

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