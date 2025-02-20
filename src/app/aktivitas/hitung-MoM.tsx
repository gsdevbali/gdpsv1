"use client"

import { useAktivitasStore } from './aktivitas-store';
import SubTotalAktivitas from './total-aktivitas';
import { useAktivitasStoreBefore } from './aktivitas-store-before';

const NeracaDataMoM = ({ row }: { row: number }) => {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalBeban2X, totalBeban3X, totalAsetAwalX, totalSelisihABX, totalAsetAkhirX } = useAktivitasStoreBefore();
    const { totalTerima1, totalTerima2, totalBebanOp, totalBeban2, totalBeban3, totalAsetAwal, totalSelisihAB, totalAsetAkhir } = useAktivitasStore();


    let calculatedValue = 0;
    switch (row) {
        case 1:
            calculatedValue = (totalTerima1 - totalTerima1X) / totalTerima1X;
            break;
        case 2:
            calculatedValue = (totalBebanOp - totalBebanOpX) / totalBebanOpX;
            break;
        case 3:
            calculatedValue = (totalBeban2 - totalBeban2X) / totalBeban2X;
            break;
        case 4:
            calculatedValue = (totalBeban3 - totalBeban3X) / totalBeban3X;
            break;
        case 5:
            calculatedValue = (totalTerima2 - totalTerima2X) / totalTerima2X;
            break;
        case 6:
            calculatedValue = (totalSelisihAB - totalSelisihABX) / totalSelisihABX;
            break;
        case 7:
            calculatedValue = (totalAsetAwal - totalAsetAwalX) / totalAsetAwalX;
            break;
        case 8:
            calculatedValue = (totalAsetAkhir - totalAsetAkhirX) / totalAsetAkhirX;
            break;
        default:
            calculatedValue = 0;
    }

    const formattedValue = (calculatedValue * 100).toFixed(2) + '%';

    return (
        <>
            <div className="w-full">

                <SubTotalAktivitas value={formattedValue} title={''} />

            </div>

        </>

    )
}

export default NeracaDataMoM;

//export default