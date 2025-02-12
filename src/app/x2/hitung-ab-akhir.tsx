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

const NeracaDataAkhir = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAsetAwal, totalSelisihAB } = useAktivitasStore();

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Update Total global States
    //const newTotal = Math.abs(totalTerima1 - totalBebanOp + totalTerima2);
    //setTotalSelisihAB(newTotal);

    const newTotalBalance = toidr(totalSelisihAB+totalAsetAwal);

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

export default NeracaDataAkhir;

//export default