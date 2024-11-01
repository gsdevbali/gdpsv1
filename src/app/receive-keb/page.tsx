import React from 'react'
import PersembahanForm from './PersembahanForm'
import PageLayout from '@/components/PageLayout'

import global from "../../config.js";
import { Toaster } from '@/components/ui/toaster';

function Page() {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <h4>{global.pageInfo.footerText}</h4>;

    return (
        <>
            <PageLayout header={header} footer={footer}>
                <h1 className='text-2xl text-bold dark:text-blue-500'>PENERIMAAN Persembahan (KAS KERK)</h1>
                <div className='flex flex-col pt-3 mb-6'>
                    {/* Form hanya untuk Penerimaan Persembahan */}
                    <PersembahanForm accountId={'2'} />
                    <Toaster />
                </div>
            </PageLayout>
        </>
    )
}

export default Page