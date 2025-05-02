"use client"

import toidr from "@/lib/toidr";
import useAktivitasContext from '@/context/aktivitas-context';

import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSelisih = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSelisihAB, totalAsetAwal, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, setTotalSelisihAB, setTotalAsetAkhir } = useAktivitasContext();

    const totalBeban = Math.abs(totalBebanOp + totalBeban2 + totalBeban3);

    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima1 - totalBeban + totalTerima2);
    //const newTotal = Math.abs(totalTerima1 - totalBebanOp + totalBeban2 + totalBeban3 + totalTerima2);

    //set Kenaikan/Penurunan Aset Bersih
    setTotalSelisihAB(newTotal);

    //set Aset Bersih Akhir
    setTotalAsetAkhir(totalSelisihAB + totalAsetAwal)

    const newTotalBalance = toidr(newTotal);

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataSelisih;

//export default