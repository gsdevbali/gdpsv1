"use client"

import { useCashflowRecStore } from './cashflowrec-store';
import { useCashflowRecStoreBefore } from './cashflowrec-store-before';
import SubTotalAktivitas from './total-aktivitas';

const NeracaDataMoM = ({ row }: { row: number }) => {

    const { totalTerima1X, totalTerima2X, totalBebanOpX, totalSurplus1X, totalSurplus2X, totalBebanPsuX } = useCashflowRecStoreBefore();
    const { totalTerima1, totalTerima2, totalBebanOp, totalSurplus1, totalSurplus2, totalBebanPsu } = useCashflowRecStore();


    let calculatedValue = 0;
    switch (row) {
        case 1:
            calculatedValue = (totalTerima1 - totalTerima1X) / totalTerima1X;
            break;
        case 2:
            calculatedValue = (totalTerima2 - totalTerima2X) / totalTerima2X;
            break;
        case 3:
            calculatedValue = (totalTerima2 - totalTerima2X) / totalTerima2X;
            break;
        case 4:
            calculatedValue = (totalBebanOp - totalBebanOpX) / totalBebanOpX;
            break;
        case 5:
            calculatedValue = (totalSurplus1 - totalSurplus1X) / totalSurplus1X;
            break;
        case 6:
            calculatedValue = (totalBebanPsu - totalBebanPsuX) / totalBebanPsuX;
            break;
        case 7:
            calculatedValue = (totalSurplus2 - totalSurplus2X) / totalSurplus2X;
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