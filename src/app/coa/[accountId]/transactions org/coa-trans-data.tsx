"use client"

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";

import { useQuery } from '@tanstack/react-query';
//import { useCfStore } from './cf-store'

const COATransData = ({ accountId }: { accountId: string }) => {

    //const { setTotalT1, setTotalT2, setTotalK1, setTotalK2, setTotalK3 } = useCfStore();

    // Fetch data using TanStack Query
    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ['coa-trans', accountId],
        queryFn: () => fetch(`/api/transbyid?accountId=${accountId}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!data) return <div>Tidak ada data (null)</div>;

    //Total & data for table
    //const { accounts: data } = result;
    //const newTotal = Math.abs(totalBalance);
    //const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        //const newTotal = Math.abs(totalBalance);
        console.log('COA per Trans - Success!')        
    };

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                <DataTable columns={columns} data={data} />
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
            </div>
        </>

    )
}

export default COATransData;
