"use client"

import { useQuery } from '@tanstack/react-query';
import useAktivitasContext from '@/context/aktivitas-context';

import { DataTable } from "./data-tables";
import { columns } from "./columns-saldo-nol";
import SubTotalNol from './total-saldo-nol';

const NeracaDataX = ({ title, titleTotal, type, group2, start, end }: { title: string; titleTotal: string; type: number; group2: number; start: string, end: string }) => {

    // declare here: Var context for AktivitasContext
    const { setTotalTerima1, setTotalTerima2, setTotalBebanOp, setTotalBeban2, setTotalBeban3 } = useAktivitasContext();
    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsX', type, group2],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        //queryFn: () => fetch(`/api/neraca-saldo-x?accountTypeId=${type}&accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-saldo-group2?accountGroup2Id=${group2}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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
    const { accounts: data, totalBalance, totalDebit, totalCredit } = result;
    //const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal);
    // const newTotalDebit = toidr(Math.abs(totalDebit));
    // const newTotalCredit = toidr(Math.abs(totalCredit));

    //Update Total global States
    // if (isSuccess) {
    //     const newTotal = Math.abs(totalBalance);
    // };
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
    }

    return (
        <>
            <div className="w-full">
                <DataTable columns={columns} data={data} />
                
                {/* <SubTotalNol /> */}
                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} />                 */}
            </div>
        </>
    )
}

export default NeracaDataX;
