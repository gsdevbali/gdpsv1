import { Suspense } from "react";

import PageLayout from "@/components/PageLayout";
import Loading from "./loading";

import global from "@/config.js";
import CashFlowData from "./cashflow-data";
import Divider from "@/components/Divider";

import WidgetPeriode from "./widget-periode";
import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import WidgetInfoTotal from "./widget-info-total";


export default async function Page() {

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN PENERIMAAN/PENGELUARAN</h1>
                <WidgetSubtitlePeriode />

                <Divider />

                {/* Periode */}
                <WidgetPeriode />

                {/* PENERIMAAN */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENERIMAAN</h1>
                <Divider />

                <Suspense fallback={<Loading section="Penerimaan Persembahan" />}>
                    {/* <RugiLabaData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} /> */}
                    <CashFlowData title="Penerimaan Persembahan" titleTotal="Penerimaan Persembahan" type={4} group2={8} />
                </Suspense>

                <Suspense fallback={<Loading section="Penerimaan Lain-lain" />}>
                    <CashFlowData title="Penerimaan Lain-lain" titleTotal="Penerimaan Lain-lain" type={4} group2={9} />
                </Suspense>


                {/* BEBAN / BIAYA2 */}
                <h1 className="text-xl font-bold pt-4 pb-2 dark:text-blue-500">PENGELUARAN</h1>
                <Divider />

                <Suspense fallback={<Loading section="Biaya Operasional Gereja" />}>
                    <CashFlowData title="Biaya Operasional Gereja" titleTotal="Biaya Operasional Gereja" type={5} group2={10} />
                </Suspense>

                <Suspense fallback={<Loading section="Biaya Sekretariat" />}>
                    <CashFlowData title="Biaya Sekretariat" titleTotal="Biaya Sekretariat" type={5} group2={11} />
                </Suspense>

                <Suspense fallback={<Loading section="Biaya Bidang/Bapel" />}>
                    <CashFlowData title="Biaya Bidang/Bapel" titleTotal="Biaya Bidang/Bapel" type={5} group2={12} />
                </Suspense>

                <br />
                {/* INFO TOTAL */}
                <WidgetInfoTotal />


            </div>
        </PageLayout >


    )
}

