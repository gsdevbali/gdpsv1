import React from 'react'
import OtherFormPay from './OtherForm'
import PageLayout from '@/components/PageLayout'

import global from "../../config.js";
import { Toaster } from '@/components/ui/toaster';

function Page() {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <h4>{global.pageInfo.footerText}</h4>;

    return (
        <>
            <PageLayout header={header} footer={footer}>
                <h1 className='text-2xl text-bold dark:text-red-500'>PENGELUARAN</h1>
                <div className='flex flex-col pt-3 mb-6'>
                    {/* Form hanya untuk Penerimaan Lain */}
                    <OtherFormPay accountId={''} />
                    <Toaster />
                </div>
            </PageLayout>
        </>
    )
}

export default Page