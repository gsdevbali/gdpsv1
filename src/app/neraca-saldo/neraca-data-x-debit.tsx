"use client"

import { useQuery } from '@tanstack/react-query';
import toidr from "@/lib/toidr";

import { DataTable } from "./data-tables";
import { columns } from "./columns-debit";
import SubTotalDK from './total-dk';

const NeracaDataDebit = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsDebit', type, group],
        // queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo-group?accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });

    if (isLoading) return <div>Tunggu...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return <div>Tidak ada data (null)</div>;

    //Total & data for table
    const { accounts: data, totalBalance, totalDebit, totalCredit } = result;

    const newTotalDebit = toidr(Math.abs(totalDebit));

    // if (isSuccess) {
    //     //UpdateTotalCF(group2, totalBalance);
    //     const newTotal = Math.abs(totalBalance);
    //     //const newTotalDebit = toidr(Math.abs(totalDebit));
    // };

    return (
        <>
            <div className="w-full">
                <DataTable columns={columns} data={data} />
                <SubTotalDK value={newTotalDebit} />
            </div>
        </>
    )
}

export default NeracaDataDebit;
