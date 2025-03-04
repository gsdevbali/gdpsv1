"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import SubTotalAktivitas from './total-aktivitas';

const NeracaDataAkhir = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAsetAwal, totalSelisihAB } = useAktivitasContext();
    const newTotalBalance = toidr(totalSelisihAB + totalAsetAwal);

    return (
        <>
            <div className="w-full">
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />
            </div>
        </>

    )
}

export default NeracaDataAkhir;
