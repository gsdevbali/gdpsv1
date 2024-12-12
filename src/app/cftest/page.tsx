"use client"

import { Suspense, useState } from "react";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import useCashFlowContext from "@/context/cashflow-context";

import WidgetPeriode from "./widget-periode";
import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import WidgetInfoTotal from "./widget-info-total";
import { useCfStore } from "./cf-store";
import ShowCFData from "./page-data";


export default async function Page() {

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    //const { isPeriodeOK, setIsPeriodeOK } = useCfStore();
    const { periodeOn } = useCashFlowContext();

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN PENERIMAAN/PENGELUARAN</h1>
                <WidgetSubtitlePeriode />

                <Divider />

                {/* Periode */}
                <WidgetPeriode />

                {
                    (periodeOn) ? <ShowCFData /> : <h2 className="py-2">Periode belum ditentukan</h2>
                }

                {/* INFO TOTAL */}
                <WidgetInfoTotal />

            </div>
        </PageLayout >


    )
}

