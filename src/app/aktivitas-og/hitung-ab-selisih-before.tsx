"use client"

import toidr from "@/lib/toidr";
import SubTotalAktivitas from './total-aktivitas';
import useAktivitasContext from '@/context/aktivitas-context';

const NeracaDataSelisihBefore = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSelisihABX, totalAsetAwalX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, setTotalSelisihABX, setTotalAsetAkhirX } = useAktivitasContext();

    const totalBeban = Math.abs(totalBebanOpX + totalBeban2X + totalBeban3X);

    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima1X - totalBeban + totalTerima2X);

    //set Kenaikan/Penurunan Aset Bersih
    setTotalSelisihABX(newTotal);

    //set Aset Bersih Akhir
    setTotalAsetAkhirX(totalSelisihABX + totalAsetAwalX)

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />
            </div>
        </>

    )
}

export default NeracaDataSelisihBefore;
