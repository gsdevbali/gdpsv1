"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columns";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
// import TulisTotalRp from "@/components/TulisTotalRp";
import { useAktivitasStoreBefore } from './aktivitas-store-before';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataSelisihBefore = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSelisihABX, totalAsetAwalX, totalTerima1X, totalTerima2X, totalBebanOpX, setTotalSelisihABX, setTotalAsetAkhirX } = useAktivitasStoreBefore();

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima1X - totalBebanOpX + totalTerima2X);

    //set Kenaikan/Penurunan Aset Bersih
    setTotalSelisihABX(newTotal);

    //set Aset Bersih Akhir
    setTotalAsetAkhirX(totalSelisihABX + totalAsetAwalX)

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

export default NeracaDataSelisihBefore;

//export default