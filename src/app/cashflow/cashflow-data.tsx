"use client"

import { DataTable } from "./data-tables";
import { columns } from "./columns";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";

import { useQuery } from '@tanstack/react-query';
//import UpdateCfStore from "./update-cfstore";
import { useCfStore } from './cf-store'
//import UpdateTotalCF from "./update-totalcf";
//import UpdateTotalCF from "./update-totalcf";

const CashFlowData = ({ title, titleTotal, type, group2 }: { title: string; titleTotal: string; type: number; group2: number }) => {

    //const cfStore = useCfStore();
    const { setTotalT1, setTotalT2, setTotalK1, setTotalK2, setTotalK3 } = useCfStore();
    //const { setTotalCf } = useCfStore();
    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['cashflow', type, group2],
        queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }),
    });



    if (isLoading) return <div>Loading...</div>; // Handle loading state
    if (error) return <div>Error: {error.message}</div>; // Handle error state
    if (!result) return null;


    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

        switch (group2) {

            case 8:
                // Handle case for group2 = 8
                // cfStore.setTotalT1(Math.abs(totalBalance))
                // console.log('Total T1:', cfStore.setTotalT1)
                setTotalT1(newTotal)
                break;
            case 9:
                // Handle case for group2 = 8
                // cfStore.setTotalT2(Math.abs(totalBalance))
                // console.log('Total T2:', cfStore.setTotalT2)
                setTotalT2(newTotal)
                break;
            case 10:
                // Handle case for group2 = 10
                // cfStore.setTotalK1(Math.abs(totalBalance))
                // console.log('Total T3:', cfStore.setTotalT3)
                setTotalK1(newTotal)
                break;
            case 11:
                // Handle case for group2 = 11
                // cfStore.setTotalK2(Math.abs(totalBalance))
                // console.log('Total K1:', cfStore.setTotalK1)
                setTotalK2(newTotal)
                break;
            case 12:
                // Handle case for group2 = 12
                // cfStore.setTotalK3(Math.abs(totalBalance))
                // console.log('Total K2:', cfStore.setTotalK2)
                setTotalK3(newTotal)
                break;

            default:
                // Handle default case
                break;
        }
    };

    // if (isSuccess) {
    //     UpdateTotalCF(group2, newTotal);
    // }
    // if (isSuccess) {
    //UpdateTotalCF(group2, newTotal);
    // }

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