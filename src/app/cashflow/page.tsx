import { Suspense } from "react";
import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
import toidr from "@/lib/toidr";
import TulisTotalRp from "@/components/TulisTotalRp";
import Divider from "@/components/Divider";
import Loading from "./loading";
import RugiLabaData from "./rl-data";
import WidgetPeriode from "./widget-periode";
import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import InfoTotal from "./info-total";

export default async function Page() {
    //const [loading, setLoading] = useState(false);
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    // const selisihAkhir = toidr(totalAktiva - totalPasiva)
    // const isBalanceSheetEqual = (totalAktiva: number, totalPasiva: number) => {
    //     return totalAktiva === totalPasiva
    // }



    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN PENERIMAAN/PENGELUARAN</h1>
                <WidgetSubtitlePeriode />

                <Divider />

                {/* Periode */}
                <WidgetPeriode />

                {/* <h1> {dataContext} </h1> */}

                {/* PENERIMAAN */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENERIMAAN</h1>
                <Divider />


                <Suspense fallback={<Loading section="Penerimaan Persembahan" />}>
                    <RugiLabaData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} />
                </Suspense>

                <Suspense fallback={<Loading section="Penerimaan Lain-lain" />}>
                    <RugiLabaData title="Penerimaan Lain-lain" titleTotal="Penerimaan Lain-lain" type={4} group2={9} />
                </Suspense>


                {/* BEBAN / BIAYA2 */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENGELUARAN</h1>
                <Divider />


                <Suspense fallback={<Loading section="Biaya Operasional Gereja" />}>
                    <RugiLabaData title="Biaya Operasional Gereja" titleTotal="Biaya Operasional Gereja" type={5} group2={10} />
                </Suspense>

                <Suspense fallback={<Loading section="Biaya Sekretariat" />}>
                    <RugiLabaData title="Biaya Sekretariat" titleTotal="Biaya Sekretariat" type={5} group2={11} />
                </Suspense>

                <Suspense fallback={<Loading section="Biaya Bidang/Bapel" />}>
                    <RugiLabaData title="Biaya Bidang/Bapel" titleTotal="Biaya Bidang/Bapel" type={5} group2={12} />
                </Suspense>

                <InfoTotal />
                
            </div>
        </PageLayout >

    )
}

