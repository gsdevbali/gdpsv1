
import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";
import Divider from "@/components/Divider";
import { Suspense } from "react";
import Loading from "./loading";
import NeracaData from "./neraca-data";
import NeracaDataSub from "./neraca-data-sub";



export default async function Page() {
    //const [loading, setLoading] = useState(false);

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;


    // const newTotalBalance_AktivaLancar = 0
    // const bewTotalBalance_AktivaTidakLancar = 0
    // const newTotalBalance_AktivaTetap = 0
    // const newTotalBalance_Kewajiban = 0
    // const newTotalBalance_AsetBersih = 0

    //const totalAktiva = totalBalance_AktivaLancar + totalBalance_AktivaTidakLancar + totalBalance_AktivaTetap
    const totalAktiva = 0
    // const totalPasiva = totalBalance_Kewajiban1 + totalBalance_Kewajiban2 + totalBalance_AsetBersih1 + totalBalance_AsetBersih2
    const totalPasiva = 0

    const newTotalAktiva = toidr(totalAktiva)
    const newTotalPasiva = toidr(totalPasiva)

    {/* Selisih Aset dan Pasiva */ }
    const selisihAkhir = toidr(totalAktiva - totalPasiva)

    const isBalanceSheetEqual = (totalAktiva: number, totalPasiva: number) => {
        return totalAktiva === totalPasiva
    }


    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">NERACA</h1>
                <Divider />

                {/* AKTIVA - KIRI */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">AKTIVA</h1>
                <Divider />

                <Suspense fallback={<Loading section="AKTIVA LANCAR" />}>
                    {/* <AktivaLancar /> */}
                    <NeracaData title="AKTIVA LANCAR" titleTotal="Aktiva Lancar" type={1} group2={1} />
                </Suspense>

                <Suspense fallback={<Loading section="AKTIVA TIDAK LANCAR" />}>
                    {/* <AktivaTidakLancar /> */}
                    <NeracaData title="AKTIVA TIDAK LANCAR" titleTotal="Aktiva Tidak Lancar" type={1} group2={3} />
                </Suspense>

                <Suspense fallback={<Loading section="AKTIVA TETAP" />}>
                    {/* <AktivaTidakLancar /> */}
                    <NeracaData title="AKTIVA TETAP" titleTotal="Aktiva Tetap" type={1} group2={2} />
                </Suspense>




                {/* PASIVA - KANAN */}

                <h2 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">KEWAJIBAN DAN ASET BERSIH</h2>
                <Divider />

                {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN</h2> */}
                <Suspense fallback={<Loading section="KEWAJIBAN" />}>
                    <NeracaData title="KEWAJIBAN" titleTotal="Kewajiban" type={2} group2={4} />
                </Suspense>

                {/* <h2 className="text-lg font-bold pt-2 pb-2">KEWAJIBAN LANCAR</h2> */}
                <Suspense fallback={<Loading section="KEWAJIBAN LANCAR" />}>
                    <NeracaData title="KEWAJIBAN LANCAR" titleTotal="Kewajiban Lancar" type={2} group2={5} />
                </Suspense>

                {/* <h2 className="text-lg font-bold pt-2 pb-2">ASET BERSIH</h2> */}
                <Suspense fallback={<Loading section="ASET BERSIH" />}>
                    <NeracaData title="ASET BERSIH" titleTotal="Aset Bersih" type={3} group2={6} />
                    <NeracaDataSub title="ASET BERSIH 2" titleTotal="Aset Bersih 2" type={3} group2={7} />
                </Suspense>



                <div className="h-4"></div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
                    {/* Rangkuman Neraca */}
                    <h1 className="text-xl font-bold pt-4 pb-2">RANGKUMAN NERACA</h1>
                    {isBalanceSheetEqual(totalAktiva, totalPasiva) ? <p className="text-green-500 pb-2">{global.pageInfo.infoNeracaBalance}</p> : <p className="text-red-500 pb-2">{global.pageInfo.infoNeracaUnbalance}</p>}

                    <TulisTotalRp value={newTotalAktiva} title="ASET" />
                    <TulisTotalRp value={newTotalPasiva} title="PASIVA (Kewajiban + Aset Bersih)" />

                    <TulisTotalRp value={selisihAkhir} title="Selisih Aset dan Pasiva" />
                </div>
            </div>
        </PageLayout >

    )
}
