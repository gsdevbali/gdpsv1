"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columnsX";
// import { columns } from "./columns-new";
//import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRpNeracaX";
import { useNeracaStoreX } from './neraca-storeX';

const NeracaDataAllgroupX = ({ title, titleTotal, type, group, group2, start, end }: { title: string; titleTotal: string; type: number; group: number; group2: number; start: string, end: string }) => {

    const { setTotalAPX, setTotalAT1X, setTotalAT2X, setTotalAT3X, setTotalAT4X } = useNeracaStoreX();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['ns-allgroupx', type, group],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        // queryFn: () => fetch(`/api/neraca-allgroup?accountTypeId=${type}&accountGroupId=${group}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-group1?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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

        //setTotalAPX(newTotal)
        switch (group) {

            case 10:
                setTotalAT1X(newTotal)
                break;
            case 11:
                setTotalAT2X(newTotal)
                break;
            case 12:
                setTotalAT3X(newTotal)
                break;
            case 12:
                setTotalAT4X(newTotal)
                break;
            case 14:
                setTotalAPX(newTotal)
                break;


            default:
                // Handle default case
                break;
        }
    };

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2>
                <DataTable columns={columns} data={data} />
                <TulisTotalRp value={newTotalBalance} title={titleTotal} />
            </div>

        </>

    )
}

export default NeracaDataAllgroupX;

//export default