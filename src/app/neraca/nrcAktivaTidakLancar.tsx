import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { getNeraca } from "./get-data";

import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";


export default async function AktivaTidakLancar() {
    //const [loading, setLoading] = useState(false);
    //const { accounts: data_AktivaLancar, totalBalance: totalBalance_AktivaLancar } = await getNeraca(1, 1)
    const { accounts: data_AktivaTidakLancar, totalBalance: totalBalance_AktivaTidakLancar } = await getNeraca(1, 3)
    const newTotalBalance_AktivaTidakLancar = toidr(totalBalance_AktivaTidakLancar)

    return (
        <>

            <div className="w-full">
                <h2 className="text-lg font-bold pt-2 pb-2">AKTIVA TIDAK LANCAR</h2>
                <DataTable columns={columns} data={data_AktivaTidakLancar} />
                <TulisTotalRp value={newTotalBalance_AktivaTidakLancar} title="Aktiva Tidak Lancar" />
            </div>

        </>

    )
}
