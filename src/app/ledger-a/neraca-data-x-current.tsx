"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columns-x1";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
// import TulisTotalRp from "@/components/TulisTotalRp";
import SubTotalAktivitasBefore from './total-aktivitas-before';

const NeracaDataX1 = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsXnow', type, group2],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        //queryFn: () => fetch(`/api/neraca-saldo-x?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Total & data for table
    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

        // switch (group2) {

        //     case 8:
        //         setTotalTerima1X(newTotal)
        //         break;
        //     case 9:
        //         setTotalTerima2X(newTotal)
        //         break;

        //     case 6:
        //         setTotalAsetAwalX(newTotal)
        //         break;

        //     case 10:
        //         setTotalBebanOpX(newTotal)

        //     default:
        //         // Handle default case
        //         break;
        // }

    };

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                <DataTable columns={columns} data={data} />
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} /> */}
                <SubTotalAktivitasBefore value={' '} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataX1;

//export default