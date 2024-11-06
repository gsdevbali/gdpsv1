import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { getNeraca } from "./get-data";


import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";


export default async function AktivaTetap() {
    //const [loading, setLoading] = useState(false);
    const { accounts: data_AktivaTetap, totalBalance: totalBalance_AktivaLancar } = await getNeraca(1, 1)
    const newTotalBalance_AktivaTetap = toidr(totalBalance_AktivaLancar)

    return (
        <>

            <div className="w-full">
                <h2 className="text-lg font-bold pt-2 pb-2">AKTIVA TETAP</h2>
                <DataTable columns={columns} data={data_AktivaTetap} />
                <TulisTotalRp value={newTotalBalance_AktivaTetap} title="Aktiva Tetap" />
            </div>

        </>

    )
}
