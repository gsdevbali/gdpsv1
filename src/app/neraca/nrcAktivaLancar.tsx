import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { getNeraca } from "./get-data";


import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";


export default async function AktivaLancar() {
    //const [loading, setLoading] = useState(false);
    const { accounts: data_AktivaLancar, totalBalance: totalBalance_AktivaLancar } = await getNeraca(1, 1)
    const newTotalBalance_AktivaLancar = toidr(totalBalance_AktivaLancar)

    return (
        <>

            <div className="w-full">
                <h2 className="text-lg font-bold pt-2 pb-2">AKTIVA LANCAR</h2>
                <DataTable columns={columns} data={data_AktivaLancar} />
                <TulisTotalRp value={newTotalBalance_AktivaLancar} title={"Aktiva Lancar"} />
            </div>

        </>

    )
}
