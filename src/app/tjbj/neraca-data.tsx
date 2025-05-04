"use client"

import { useQuery } from '@tanstack/react-query';
import useAktivitasContext from '@/context/aktivitas-context';

import { DataTable } from "./data-tables";
import { columns } from "./columns";

const NeracaData = ({ key, type, group2, start, end }: { key:string; type: number; group2: number; start: string, end: string }) => {

    const { setTotalTerima1, setTotalTerima2 } = useAktivitasContext();
    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: [{key}, type, group2],
        queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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

    if (isSuccess) {

        const newTotal = Math.abs(totalBalance);

        switch (group2) {

            case 8:
                setTotalTerima1(newTotal)
                break;
            case 9:
                setTotalTerima2(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    }

    return (
        <>
            <div className="w-full">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}

export default NeracaData;
