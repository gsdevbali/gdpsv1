"use client"

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";

import { useQuery } from '@tanstack/react-query';
//import UpdateCfStore from "./update-cfstore";
import { useCfStore } from './cf-store'

const CashFlowData = async ({ title, titleTotal, type, group2 }: { title: string; titleTotal: string; type: number; group2: number }) => {

    const cfStore = useCfStore();
    //const { setTotalCf } = useCfStore();
    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['cashflow', type, group2],
        queryFn: async () => {
            const response = await fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' });
            if (!response.ok) throw new Error('Network response was not ok');

            if (isSuccess) {
                switch (group2) {

                    case 8:
                        // Handle case for group2 = 8
                        cfStore.setTotalT1(Math.abs(totalBalance))
                        break;
                    case 9:
                        // Handle case for group2 = 8
                        cfStore.setTotalT2(Math.abs(totalBalance))
                        break;
                    case 10:
                        // Handle case for group2 = 10
                        cfStore.setTotalK1(Math.abs(totalBalance))
                        break;
                    case 11:
                        // Handle case for group2 = 11
                        cfStore.setTotalK2(Math.abs(totalBalance))
                        break;
                    case 12:
                        // Handle case for group2 = 12
                        cfStore.setTotalK3(Math.abs(totalBalance))
                        break;

                    default:
                        // Handle default case
                        break;
                }
            }

            return response.json();
        }
    });

    if (isLoading) return <div>Loading...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return null;

    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //if (isSuccess) { setTotalCf(888); };

    // update value of TotalCf
    //setTotalCf(888);
    //UpdateCfStore();

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

export default CashFlowData;

//export default