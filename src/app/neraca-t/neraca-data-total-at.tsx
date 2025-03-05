"use client"

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import Divider from '@/components/Divider';

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalAT = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1, totalAT2, totalAT3, totalAT4, totalAP, setTotalAT } = useNeracaTContext();
   
    const subAT = totalAT1 + totalAT2 + totalAT3 + totalAT4;
    const newTotalBalance = toidr(subAT);


    return (
        <>
            <Divider />
            <TulisRekapRp value={newTotalBalance} title={title} />

        </>

    )
}

export default NeracaDataTotalAT;

//export default