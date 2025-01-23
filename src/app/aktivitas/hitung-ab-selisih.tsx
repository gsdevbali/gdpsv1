"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columns";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
// import TulisTotalRp from "@/components/TulisTotalRp";
import { useAktivitasStore } from './aktivitas-store';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataX = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalSelisihAB, totalAsetAwal, totalTerima1, totalTerima2, totalBebanOp, setTotalSelisihAB, setTotalAsetAkhir } = useAktivitasStore();

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Hitung Kenaikan/Penurunan Aset Bersih
    const newTotal = Math.abs(totalTerima1 - totalBebanOp + totalTerima2);

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

export default NeracaDataX;

//export default