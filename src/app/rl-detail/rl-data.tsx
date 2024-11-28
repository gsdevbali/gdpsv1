import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { getRL } from "./get-data";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";

import { useContext } from "react";
import { TotalRLDetailContext } from "../page";

const RugiLabaData = async ({ title, titleTotal, type, group2 }: { title: string; titleTotal: string; type: number; group2: number }) => {

    const { accounts: data, totalBalance: totalBalance } = await getRL(type, group2)
    const newTotal = Math.abs(totalBalance);
    const newTotalBalance = toidr(newTotal)

    const xtotal = useContext(TotalRLDetailContext);

    console.log(xtotal);

    return (
        <>
            <div className="w-full">
                <h2 className="text-lg font-bold pt-2 pb-2">{title}</h2>
                <DataTable columns={columns} data={data} />
                <TulisTotalRp value={newTotalBalance} title={titleTotal} />
                <h1>{xtotal}</h1>
            </div>

        </>

    )
}

export default RugiLabaData;

//export default