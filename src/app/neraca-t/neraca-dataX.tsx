"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tablesX";
import { columns } from "./columnsX";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRpNeracaX";
//import { useNeracaStore } from './neraca-storeX';
import { useNeracaStoreX } from './neraca-storeX';

const NeracaDataX = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    //const { setTotalAL, setTotalATL, setTotalAT, setTotalK, setTotalKL, setTotalAB, setTotalAB2 } = useNeracaStore();
    const { setTotalALX, setTotalATLX, setTotalATX, setTotalKX, setTotalKLX, setTotalABX, setTotalAB2X } = useNeracaStoreX();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['ns-x', type, group2],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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

        switch (group2) {

            case 1:
                setTotalALX(newTotal)
                break;
            case 3:
                setTotalATLX(newTotal)
                break;
            case 2:
                setTotalATX(newTotal)
                break;
            case 4:
                setTotalKX(newTotal)
                break;
            case 5:
                setTotalKLX(newTotal)
                break;
            case 6:
                setTotalABX(newTotal)
                break;
            case 7:
                setTotalAB2X(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full">
                <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2>
                <DataTable columns={columns} data={data} />
                <TulisTotalRp value={newTotalBalance} title={titleTotal} />
            </div>

        </>

    )
}

export default NeracaDataX;

//export default