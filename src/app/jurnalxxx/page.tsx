import React from 'react';
import PageLayout from '@/components/PageLayout';
import global from "../../config.js";
import JurnalUmum from './JurnalUmum';
//import JurnalUmumMain from './JurnalUmumMain';
//import { DataTable } from '../transaction/DataTableWrapper.jsx';
//import { columns } from '../transaction/columns';
//import { revalidatePath } from 'next/cache.js';

async function getTransaction() {
    const res = await fetch(`${global.baseUrl}/api/transaction`)
    const data = await res.json()
    //console.log(data)
    return data
}

const Journal = async () => {
    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    //const data = await getTransaction()

    return (
        <PageLayout header={header} footer={footer}>
            <div className='flex flex-col py-2 grow'>
                {/* <h2>Jurnal Umum</h2> */}
            </div>

            {/* <JurnalUmum /> */}
            {/* <div>
                <JurnalUmum />
                <DataTable columns={columns} data={data} pageSize={3} deleteAction={deleteTransactions} />
            </div> */}
        </PageLayout>
    );
};

export default Journal;