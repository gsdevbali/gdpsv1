"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitasBefore from './total-aktivitas-before';


const NeracaDataBefore = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    // const { totalSelisihABX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X,
    //     setTotalAsetAwalX, setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBeban2X, setTotalBeban3X, setTotalSelisihABX } = useAktivitasStoreBefore();
    const { totalSelisihABX, totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X,
        setTotalAsetAwalX, setTotalTerima1X, setTotalTerima2X, setTotalBebanOpX, setTotalBeban2X, setTotalBeban3X, setTotalSelisihABX } = useAktivitasContext();

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['ns2', type, group2],
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

            case 6:
                setTotalAsetAwalX(newTotal)
                break;

            case 10:
                setTotalBebanOpX(newTotal)

            case 11:
                setTotalBeban2X(newTotal)
                break;

            case 12:
                setTotalBeban3X(newTotal)
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
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaDataBefore;

//export default