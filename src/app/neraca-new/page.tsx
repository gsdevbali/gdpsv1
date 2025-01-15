"use client"

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import WidgetPeriode from "./widget-periode";
import WidgetSubtitlePeriode from "./widget-subtitle-periode";


export default function Page() {

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { setPeriodeOn } = useNeracaSaldoContext();

    setPeriodeOn(false)

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                {/* <h1 className="text-3xl font-bold dark:text-blue-500">NERACA</h1> */}
                <h1 className="text-3xl font-bold dark:text-blue-500">GKI DENPASAR</h1>
                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN KEUANGAN</h1>
                {/* <Divider /> */}
                <WidgetSubtitlePeriode />

                <Divider />

                {/* Periode & Data */}
                <WidgetPeriode />

                {/* {
                    (periodeOn) ? <ShowCFData /> : <h2 className="py-2">Periode belum ditentukan</h2>
                } */}
                {/* <ShowCFData />  */}

                {/* INFO TOTAL */}


            </div>
        </PageLayout >


    )
}

