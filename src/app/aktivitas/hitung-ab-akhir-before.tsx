"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columns";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
// import TulisTotalRp from "@/components/TulisTotalRp";
import SubTotalAktivitas from './total-aktivitas';
import { useAktivitasStoreBefore } from './aktivitas-store-before';

const NeracaDataAkhirBefore = ({ title, titleTotal }: { title: string; titleTotal: string }) => {

    const { totalAsetAwalX, totalSelisihABX } = useAktivitasStoreBefore();

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Update Total global States
    //const newTotal = Math.abs(totalTerima1 - totalBebanOp + totalTerima2);
    //setTotalSelisihAB(newTotal);

    const newTotalBalance = toidr(totalSelisihABX + totalAsetAwalX);

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

export default NeracaDataAkhirBefore;

//export default