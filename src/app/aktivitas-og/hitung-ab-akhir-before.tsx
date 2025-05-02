"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import SubTotalAktivitas from './total-aktivitas';

const NeracaDataAkhirBefore = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAsetAwalX, totalSelisihABX } = useAktivitasContext();

    const newTotalBalance = toidr(totalSelisihABX + totalAsetAwalX);

    return (
        <>
            <div className="w-full">
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />
            </div>
        </>

    )
}

export default NeracaDataAkhirBefore;
