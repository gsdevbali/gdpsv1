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
import { useAktivitasStoreBefore } from './aktivitas-store-before';

const NeracaDataMoM = ({ row }: { row: number }) => {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalAsetAwalX, totalSelisihABX, totalAsetAkhirX } = useAktivitasStoreBefore();
    const { totalTerima1, totalTerima2, totalBebanOp, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasStore();


    let calculatedValue = 0;
    switch (row) {
        case 1:
            calculatedValue = (totalTerima1 - totalTerima1X) / totalTerima1X;
            break;
        case 2:
            calculatedValue = (totalBebanOp - totalBebanOpX) / totalBebanOpX;
            break;
        case 3:
            calculatedValue = (totalTerima2 - totalTerima2X) / totalTerima2X;
            break;
        case 4:
            calculatedValue = (totalSelisihAB - totalSelisihABX) / totalSelisihABX;
            break;
        case 5:
            calculatedValue = (totalAsetAwal - totalAsetAwalX) / totalAsetAwalX;
            break;
        case 6:
            calculatedValue = (totalAsetAkhir - totalAsetAkhirX) / totalAsetAkhirX;
            break;
        default:
            calculatedValue = 0;
    }
    //const formattedValue = toidr(calculatedValue);
    const formattedValue = (calculatedValue * 100).toFixed(2) + '%';

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                <SubTotalAktivitas value={formattedValue} title={''} />

            </div>

        </>

    )
}

export default NeracaDataMoM;

//export default