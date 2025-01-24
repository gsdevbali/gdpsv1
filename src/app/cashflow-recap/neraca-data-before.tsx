"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import { useCashflowRecStoreBefore } from './cashflowrec-store-before';
import SubTotalAktivitasBefore from './total-aktivitas-before';

const NeracaDataBefore = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    const { setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBebanPsuX } = useCashflowRecStoreBefore();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsbefore', type, group2],
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

    //Total & data for table
    const { accounts: data, totalBalance } = result;
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal);

    //Update Total global States
    if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        const newTotal = Math.abs(totalBalance);

        switch (group2) {

            case 8:
                setTotalTerima1X(newTotal)
                break;
            case 9:
                setTotalTerima2X(newTotal)
                break;
            case 10:
                setTotalBebanOpX(newTotal)
            case 2:
                setTotalBebanPsuX(newTotal)

            default:
                // Handle default case
                break;
        }

    };

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataBefore;

//export default