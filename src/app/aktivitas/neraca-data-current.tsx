"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import useAktivitasContext from "@/context/aktivitas-context";

import SubTotalAktivitas from './total-aktivitas';

const NeracaData = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    // const { totalSelisihAB, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3,
    //     setTotalAsetAwal, setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3, setTotalSelisihAB } = useAktivitasStore();
    const { totalSelisihAB, totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3,
        setTotalAsetAwal, setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3, setTotalSelisihAB } = useAktivitasContext();


    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsnow', type, group2],
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

            case 8:
                setTotalTerima1(newTotal)
                break;
            case 9:
                setTotalTerima2(newTotal)
                break;

            case 6:
                setTotalAsetAwal(newTotal)
                break;

            case 10:
                setTotalBebanOp(newTotal)

            case 11:
                setTotalBeban2(newTotal)
                break;

            case 12:
                setTotalBeban3(newTotal)
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
                <SubTotalAktivitas value={newTotalBalance} title={titleTotal} />

            </div>

        </>

    )
}

export default NeracaData;

//export default