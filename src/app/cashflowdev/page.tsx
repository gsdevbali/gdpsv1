"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";

import WidgetPeriode from "./widget-periode";
import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import MonthYearSelector from "./widget-monthly";
import YearSelector from "./widget-yearly";

import useCashFlowContext from "@/context/cashflow-context";


export default function Page() {

    const [periodType, setPeriodType] = useState<'monthly' | 'yearly'>('monthly');

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { setPeriodeOn } = useCashFlowContext();

    setPeriodeOn(false)

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">LAPORAN PENERIMAAN/PENGELUARAN</h1>
                <WidgetSubtitlePeriode />

                <Divider />

                {/* Periode & Data */}
                <WidgetPeriode />

                {/* {
                    (periodeOn) ? <ShowCFData /> : <h2 className="py-2">Periode belum ditentukan</h2>
                } */}
                {/* <ShowCFData />  */}

                {/* INFO TOTAL */}
                {/* Period Type Selection Buttons */}
                <div className="flex gap-2 mb-4 py-2">
                    <Button 
                        variant={periodType === 'monthly' ? 'default' : 'outline'}
                        onClick={() => setPeriodType('monthly')}
                    >
                        Bulanan
                    </Button>
                    <Button 
                        variant={periodType === 'yearly' ? 'default' : 'outline'}
                        onClick={() => setPeriodType('yearly')}
                    >
                        Tahunan
                    </Button>
                </div>

                {/* Period Selector Component */}
                {periodType === 'monthly' ? <MonthYearSelector /> : <YearSelector />}


            </div>
        </PageLayout >


    )
}

