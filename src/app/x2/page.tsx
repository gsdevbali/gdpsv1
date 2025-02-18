"use client"

import { useSearchParams } from 'next/navigation'

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import useNeracaSaldoContext from "@/context/neraca-saldo-context";

//import WidgetPeriode from "./widget-periode";
import WidgetSubtitlePeriode from "./widget-subtitle-periode";
import MonthYearSelector from "./widget-monthly";


export default function Page() {

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const type = searchParams.get('type');
    const group = searchParams.get('group');

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    const { subTitle, setPeriodeOn } = useNeracaSaldoContext();

    setPeriodeOn(false);

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">

                <h1 className="text-3xl font-bold dark:text-blue-500">BUKU BESAR Akun: {title}</h1>
                {/* <Divider /> */}
                <WidgetSubtitlePeriode />

                <Divider />

                <MonthYearSelector title={title || ''} type={type ? parseInt(type) : 0} group={group ? parseInt(group) : 0} />

            </div>
        </PageLayout >


    )
}

