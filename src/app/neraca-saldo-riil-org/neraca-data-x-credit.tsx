"use client"

import { useQuery } from '@tanstack/react-query';

import { DataTable } from "./data-tables";
import { columns } from "./columns-credit";
import toidr from "@/lib/toidr";
// import TulisTotalRp from "@/components/TulisTotalRp";
import SubTotalAktivitasBefore from './total-aktivitas-before';
import SubTotalDK from './total-dk';

const NeracaDataCredit = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    // Fetch data using TanStack Query
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nsCredit', type, group],
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

    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal)

    //Total & data for table
    const { accounts: data, totalBalance, totalDebit, totalCredit } = result;
    // const newTotal = Math.abs(totalBalance);
    // const newTotalBalance = toidr(newTotal);

    // const newTotalDebit = toidr(Math.abs(totalDebit));
    const newTotalCredit = toidr(Math.abs(totalCredit));

    //Update Total global States
    // if (isSuccess) {
        //UpdateTotalCF(group2, totalBalance);
        //const newTotal = Math.abs(totalBalance);

    //};

    return (
        <>
            <div className="w-full">
                {/* <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2> */}
                <DataTable columns={columns} data={data} />
                {/* <TulisTotalRp value={newTotalBalance} title={titleTotal} /> */}
                {/* <SubTotalAktivitasBefore value={newTotalBalance} title={titleTotal} /> */}
                {/* <SubTotalDK valueD={newTotalDebit} valueK={newTotalCredit} /> */}
                <SubTotalDK value={newTotalCredit} />
                {/* <SubTotalAktivitasBefore value={newTotalCredit} title={titleTotal} /> */}
                {/* <SubTotalAktivitasBefore value={' '} title={titleTotal} /> */}

            </div>

        </>

    )

}


export default NeracaDataCredit;

//export default