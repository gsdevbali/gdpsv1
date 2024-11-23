import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";

const NeracaData = async ({ title, titleTotal, type, group2 }: { title: string; titleTotal: string; type: number; group2: number }) => {

    const { accounts: data, totalBalance: totalBalance } = await getNeraca(type, group2)
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal)

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

export default NeracaData;

//export default