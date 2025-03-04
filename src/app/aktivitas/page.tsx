"use client"

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import MonthYearSelector from "./widget-monthly";


export default function Page() {

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { subTitle, setPeriodeOn } = useNeracaSaldoContext();

    setPeriodeOn(false);

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN AKTIVITAS & ARUS KAS</h1>
                {/* <Divider /> */}
                <WidgetSubtitlePeriode />
                {/* {subTitle} */}

                <Divider />

                {/* Periode & Data */}
                {/* <WidgetPeriode /> */}
                <MonthYearSelector />

            </div>
        </PageLayout >


    )
}

