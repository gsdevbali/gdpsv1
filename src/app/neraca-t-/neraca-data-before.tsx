"use client"

import { useQuery } from '@tanstack/react-query';

import toidr from "@/lib/toidr";
import { useNeracaTStoreBefore } from './neraca-store-before';
import SubTotalAktivitas from './total-aktivitas';

const NeracaData = ({ title, titleTotal, type, group, start, end }: { title: string; titleTotal: string; type: number; group: number; start: string, end: string }) => {

    //Siapkan variable Context dari useNeracaTStoreBefore()
    const { setKasX, setBankX, setDepositoX, setPiutangX, setPiutangLainX, setBonSemX, setBiayaMukaX, setTotalALX } = useNeracaTStoreBefore();

    // Fetch data using TanStack Query
    // API : Neraca-X - filter by Type and GroupId
    const { data: result, isLoading, error, isSuccess } = useQuery({
        queryKey: ['nst-b', type, group],
        //queryFn: () => fetch(`/api/neraca?accountTypeId=${type}&accountGroup2Id=${group2}`, { cache: 'no-store' })
        queryFn: () => fetch(`/api/neraca-x?accountTypeId=${type}&accountGroupId=${group}&startDate=${start}&endDate=${end}`, { cache: 'no-store' })
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

        const newTotal = Math.abs(totalBalance);

        // Simpan Saldo di variable Context/Global berdasar group
        switch (group) {

            case 1:
                setKasX(newTotal)
                break;
            case 2:
                setBankX(newTotal)
                break;
            case 3:
                setDepositoX(newTotal)
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