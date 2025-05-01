"use client"

import { useQuery } from '@tanstack/react-query';
import toidr from "@/lib/toidr";
import SubTotalDK from './total-dk';
import Divider from '@/components/Divider';

const NeracaDataTotalDK = ({ start, end }: { start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsTotalD', start, end],
        // queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo-total-dk?startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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
    const newTotalCredit = toidr(Math.abs(totalCredit));

    // if (isSuccess) {
    //     //UpdateTotalCF(group2, totalBalance);
    //     const newTotal = Math.abs(totalBalance);
    //     //const newTotalDebit = toidr(Math.abs(totalDebit));
    // };

    return (
        <>
            <div className="flex flex-row">
                {/* <DataTable columns={columns} data={data} /> */}

                <div className="w-1/2 pr-2">
                    <Divider />
                    <div className='pr-2'>
                    <p className='text-start text-blue-600 dark:text-orange-600 font-bold'>TOTAL</p>
                </div>
                </div>
                    <div className="w-1/2 pr-2 flex flex-row gap-2">
                        <div className="w-1/2 pr-2 text-blue-600 dark:text-orange-600 font-bold">
                            <SubTotalDK value={newTotalDebit} />
                        </div>
                        <div className="w-1/2 pr-2 text-blue-600 dark:text-orange-600 font-bold">
                            <SubTotalDK value={newTotalCredit} />
                        </div>    
                    </div>

            </div>
        </>
    )
}

export default NeracaDataTotalDK;
