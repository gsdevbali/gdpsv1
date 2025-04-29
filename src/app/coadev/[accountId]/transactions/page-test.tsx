"use client"

import { Suspense } from "react";
import { useQuery } from '@tanstack/react-query';

import PageLayout from "@/components/PageLayout";
import Divider from "@/components/Divider";
import global from "@/config.js";
import prisma from "@/lib/dbprisma";

import Loading from "./loading";
import { DataTable } from "./data-tables";
import { columns } from "./columns";
import COATransData from "./coa-trans-data";
import GetCoa from "@/lib/get-coa";


export default function Page({ params }: { params: { accountId: string } }) {

    const accountId = params.accountId as string;
    const account = GetCoa(parseInt(accountId));

    //const account = async prisma.account.findUnique({ where: { id: parseInt(accountId) } })
    //const data = getDataQ(accountId)

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            
            <div className="w-full">
                <h2 className="text-lg font-bold">Daftar Transaksi Akun: </h2>
                {/* <h2 className="text-lg font-bold">Daftar Transaksi Akun: {account.code} - {account.name}</h2> */}

                <Divider />
                {/* <DataTable columns={columns} data={data} /> */}
                {/* <Suspense fallback={<Loading />}> */}
                <COATransData accountId={accountId} />
                {/* </Suspense> */}

            </div>
        </PageLayout>
    )
}
