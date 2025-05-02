"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import MonthYearSelector from "./widget-monthly";
import YearSelector from "./widget-yearly";


export default function Page() {
    const [periodType, setPeriodType] = useState<'monthly' | 'yearly'>('monthly');

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { subTitle, setTitleMY, setPeriodeOn } = useNeracaSaldoContext();

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
                {/* <MonthYearSelector /> */}

                {/* Period Type Selection Buttons */}
                <div className="flex gap-2 mb-4 py-2">
                    <Button 
                        variant={periodType === 'monthly' ? 'default' : 'outline'}
                        onClick={() => {
                            setPeriodType('monthly');
                            setTitleMY('MoM');
                        }}
                    >
                        Bulanan
                    </Button>
                    <Button 
                        variant={periodType === 'yearly' ? 'default' : 'outline'}
                        onClick={() => {
                            setPeriodType('yearly');
                            setTitleMY('YoY');
                        }}
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

