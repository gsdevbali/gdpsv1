"use client"

import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');

// totalTerima1: number;
// totalTerima2: number;
// totalBebanOp: number;
// totalBeban2: number,
// totalBeban3: number,
// totalSelisihAB: number;
// totalAsetAwal: number;
// totalAsetAkhir: number;
// setTotalTerima1: (setTotalTerima1: number) => void;
// setTotalTerima2: (setTotalTerima2: number) => void;
// setTotalBebanOp: (setTotalBebanOp: number) => void;
// setTotalBeban2: (setTotalBeban2: number) => void;
// setTotalBeban3: (setTotalBeban3: number) => void;
// setTotalSelisihAB: (setTotalSelisihAB: number) => void;
// setTotalAsetAwal: (setTotalAsetAwal: number) => void;
// setTotalAsetAkhir: (setTotalAsetAkhir: number) => void;

const AktivitasContext = createContext
    <{

        //current
        totalTerima1: number; setTotalTerima1: (type: number) => void;
        totalTerima2: number; setTotalTerima2: (type: number) => void;
        totalBebanOp: number; setTotalBebanOp: (type: number) => void;
        totalBeban2: number; setTotalBeban2: (type: number) => void;
        totalBeban3: number; setTotalBeban3: (type: number) => void;
        totalSelisihAB: number; setTotalSelisihAB: (type: number) => void;
        totalAsetAwal: number; setTotalAsetAwal: (type: number) => void;
        totalAsetAkhir: number; setTotalAsetAkhir: (type: number) => void;

        //before
        totalTerima1X: number; setTotalTerima1X: (type: number) => void;
        totalTerima2X: number; setTotalTerima2X: (type: number) => void;
        totalBebanOpX: number; setTotalBebanOpX: (type: number) => void;
        totalBeban2X: number; setTotalBeban2X: (type: number) => void;
        totalBeban3X: number; setTotalBeban3X: (type: number) => void;
        totalSelisihABX: number; setTotalSelisihABX: (type: number) => void;
        totalAsetAwalX: number; setTotalAsetAwalX: (type: number) => void;
        totalAsetAkhirX: number; setTotalAsetAkhirX: (type: number) => void;

    }>

    ({
        totalTerima1: 0, setTotalTerima1: () => { },
        totalTerima2: 0, setTotalTerima2: () => { },
        totalBebanOp: 0, setTotalBebanOp: () => { },
        totalBeban2: 0, setTotalBeban2: () => { },
        totalBeban3: 0, setTotalBeban3: () => { },
        totalSelisihAB: 0, setTotalSelisihAB: () => { },
        totalAsetAwal: 0, setTotalAsetAwal: () => { },
        totalAsetAkhir: 0, setTotalAsetAkhir: () => { },

        totalTerima1X: 0, setTotalTerima1X: () => { },
        totalTerima2X: 0, setTotalTerima2X: () => { },
        totalBebanOpX: 0, setTotalBebanOpX: () => { },
        totalBeban2X: 0, setTotalBeban2X: () => { },
        totalBeban3X: 0, setTotalBeban3X: () => { },
        totalSelisihABX: 0, setTotalSelisihABX: () => { },
        totalAsetAwalX: 0, setTotalAsetAwalX: () => { },
        totalAsetAkhirX: 0, setTotalAsetAkhirX: () => { },

    });

export function AktivitasProvider({ children }: {
    children: React.ReactNode;
}) {

    const [totalTerima1, setTotalTerima1] = useState(0);
    const [totalTerima2, setTotalTerima2] = useState(0);
    const [totalBebanOp, setTotalBebanOp] = useState(0);
    const [totalBeban2, setTotalBeban2] = useState(0);
    const [totalBeban3, setTotalBeban3] = useState(0);
    const [totalSelisihAB, setTotalSelisihAB] = useState(0);
    const [totalAsetAwal, setTotalAsetAwal] = useState(0);
    const [totalAsetAkhir, setTotalAsetAkhir] = useState(0);

    const [totalTerima1X, setTotalTerima1X] = useState(0);
    const [totalTerima2X, setTotalTerima2X] = useState(0);
    const [totalBebanOpX, setTotalBebanOpX] = useState(0);
    const [totalBeban2X, setTotalBeban2X] = useState(0);
    const [totalBeban3X, setTotalBeban3X] = useState(0);
    const [totalSelisihABX, setTotalSelisihABX] = useState(0);
    const [totalAsetAwalX, setTotalAsetAwalX] = useState(0);
    const [totalAsetAkhirX, setTotalAsetAkhirX] = useState(0);

    // const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'monthly'
    // const [subTitleCf, setSubTitleCf] = useState('Semua');
    // const [totalTerima, setTotalTerima] = useState(0);
    // const [periodeOn, setPeriodeOn] = useState(false);
    // const [start, setStartContext] = useState('01-01-2000');
    // const [end, setEndContext] = useState('12-31-3024');

    return (
        <AktivitasContext.Provider value={{
            totalTerima1, setTotalTerima1,
            totalTerima2, setTotalTerima2,
            totalBebanOp, setTotalBebanOp,
            totalBeban2, setTotalBeban2,
            totalBeban3, setTotalBeban3,
            totalSelisihAB, setTotalSelisihAB,
            totalAsetAwal, setTotalAsetAwal,
            totalAsetAkhir, setTotalAsetAkhir,

            totalTerima1X, setTotalTerima1X,
            totalTerima2X, setTotalTerima2X,
            totalBebanOpX, setTotalBebanOpX,
            totalBeban2X, setTotalBeban2X,
            totalBeban3X, setTotalBeban3X,
            totalSelisihABX, setTotalSelisihABX,
            totalAsetAwalX, setTotalAsetAwalX,
            totalAsetAkhirX, setTotalAsetAkhirX,
        }}>
            {children}
        </AktivitasContext.Provider>
    )

}

export default function useAktivitasContext() {
    const context = useContext(AktivitasContext);
    if (!context) {
        throw new Error(
            "useAktivitasContext must be used within a AktivitasProvider"
        );
    }
    return context;
}
