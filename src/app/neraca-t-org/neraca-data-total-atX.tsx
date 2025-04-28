"use client"

import toidr from "@/lib/toidr";
import useNeracaTContext from '@/context/neraca-t-context';
import TulisRekapRp from '@/components/TulisRekapRpNeracaCurrent';
import Divider from '@/components/Divider';

//Tampilkan Total Aktiva Tetap
const NeracaDataTotalATX = ({ title, start, end }: { title: string; start: string, end: string }) => {

    const { totalAT1X, totalAT2X, totalAT3X, totalAT4X } = useNeracaTContext();
   
    const subAT = totalAT1X + totalAT2X + totalAT3X + totalAT4X;
    const newTotalBalance = toidr(subAT);


    return (
        <>
            <Divider />
            <TulisRekapRp value={newTotalBalance} title={title} />

        </>

    )
}

export default NeracaDataTotalATX;

//export default