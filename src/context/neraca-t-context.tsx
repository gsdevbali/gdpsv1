"use client"

import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');
// totalA: number;
// totalAL: number;
// totalATL: number;
// totalAT: number;
// totalAP: number;

// totalAT1: number;
// totalAT2: number;
// totalAT3: number;
// totalAT4: number;

// totalK: number;
// totalKL: number;
// totalAB: number;
// totalAB2: number;

const NeracaTContext = createContext
    <{
        totalA: number; setTotalA: (type: number) => void;
        totalAL: number; setTotalAL: (type: number) => void;
        totalATL: number; setTotalATL: (type: number) => void;
        totalAT: number; setTotalAT: (type: number) => void;
        totalAP: number; setTotalAP: (type: number) => void;

        totalAT1: number; setTotalAT1: (type: number) => void;
        totalAT2: number; setTotalAT2: (type: number) => void;
        totalAT3: number; setTotalAT3: (type: number) => void;
        totalAT4: number; setTotalAT4: (type: number) => void;

        totalK: number; setTotalK: (type: number) => void;
        totalAB: number; setTotalAB: (type: number) => void;
        totalAB2: number; setTotalAB2: (type: number) => void;

        totalAX: number; setTotalAX: (type: number) => void;
        totalALX: number; setTotalALX: (type: number) => void;
        totalATLX: number; setTotalATLX: (type: number) => void;
        totalATX: number; setTotalATX: (type: number) => void;
        totalAPX: number; setTotalAPX: (type: number) => void;

        totalAT1X: number; setTotalAT1X: (type: number) => void;
        totalAT2X: number; setTotalAT2X: (type: number) => void;
        totalAT3X: number; setTotalAT3X: (type: number) => void;
        totalAT4X: number; setTotalAT4X: (type: number) => void;

        totalKX: number; setTotalKX: (type: number) => void;
        totalABX: number; setTotalABX: (type: number) => void;
        totalAB2X: number; setTotalAB2X: (type: number) => void;



        // filterType: string; setFilterType: (type: string) => void;
        // subTitleCf: string; setSubTitleCf: (type: string) => void;
        // totalTerima: number; setTotalTerima: (type: number) => void;
        // periodeOn: boolean; setPeriodeOn: (type: boolean) => void;
        // start: string; setStartContext: (type: string) => void;
        // end: string; setEndContext: (type: string) => void;
    }>

    ({


        totalA: 0, setTotalA: () => { },
        totalAL: 0, setTotalAL: () => { },
        totalATL: 0, setTotalATL: () => { },
        totalAT: 0, setTotalAT: () => { },
        totalAP: 0, setTotalAP: () => { },

        totalAT1:0, setTotalAT1: () => {},
        totalAT2: 0, setTotalAT2: () => { },
        totalAT3: 0, setTotalAT3: () => { },
        totalAT4: 0, setTotalAT4: () => { },

        totalK: 0, setTotalK: () => { },
        totalAB: 0, setTotalAB: () => { },
        totalAB2: 0, setTotalAB2: () => { },

        totalAX: 0, setTotalAX: () => { },
        totalALX: 0, setTotalALX: () => { },
        totalATLX: 0, setTotalATLX: () => { },
        totalATX: 0, setTotalATX: () => { },
        totalAPX: 0, setTotalAPX: () => { },

        totalAT1X:0, setTotalAT1X: () => {},
        totalAT2X:0, setTotalAT2X: () => {},
        totalAT3X:0, setTotalAT3X: () => {},
        totalAT4X:0, setTotalAT4X: () => {},

        totalKX: 0, setTotalKX: () => { },
        totalABX: 0, setTotalABX: () => { },
        totalAB2X: 0, setTotalAB2X: () => { },


    });

export function NeracaTProvider({ children }: {
    children: React.ReactNode;
}) {

    const [totalA, setTotalA] = useState(0);
    const [totalAL, setTotalAL] = useState(0);
    const [totalATL, setTotalATL] = useState(0);
    const [totalAT, setTotalAT] = useState(0);
    const [totalAP, setTotalAP] = useState(0);

    const [totalAT1, setTotalAT1] = useState(0);
    const [totalAT2, setTotalAT2] = useState(0);
    const [totalAT3, setTotalAT3] = useState(0);
    const [totalAT4, setTotalAT4] = useState(0);

    const [totalK, setTotalK] = useState(0);
    const [totalAB, setTotalAB] = useState(0);
    const [totalAB2, setTotalAB2] = useState(0);

    const [totalAX, setTotalAX] = useState(0);
    const [totalALX, setTotalALX] = useState(0);
    const [totalATLX, setTotalATLX] = useState(0);
    const [totalATX, setTotalATX] = useState(0);
    const [totalAPX, setTotalAPX] = useState(0);

    const [totalAT1X, setTotalAT1X] = useState(0);
    const [totalAT2X, setTotalAT2X] = useState(0);
    const [totalAT3X, setTotalAT3X] = useState(0);
    const [totalAT4X, setTotalAT4X] = useState(0);

    const [totalKX, setTotalKX] = useState(0);
    const [totalABX, setTotalABX] = useState(0);
    const [totalAB2X, setTotalAB2X] = useState(0);

    return (
        <NeracaTContext.Provider value={{

            totalA, setTotalA,
            totalAL, setTotalAL,
            totalATL, setTotalATL,
            totalAT, setTotalAT,

            totalAT1, setTotalAT1,
            totalAT2, setTotalAT2,
            totalAT3, setTotalAT3,
            totalAT4, setTotalAT4,

            totalAP, setTotalAP,
            totalK, setTotalK,
            totalAB, setTotalAB,
            totalAB2, setTotalAB2,

            totalAX, setTotalAX,
            totalALX, setTotalALX,
            totalATLX, setTotalATLX,
            totalATX, setTotalATX,

            totalAT1X, setTotalAT1X,
            totalAT2X, setTotalAT2X,
            totalAT3X, setTotalAT3X,
            totalAT4X, setTotalAT4X,

            totalAPX, setTotalAPX,
            totalKX, setTotalKX,
            totalABX, setTotalABX,
            totalAB2X, setTotalAB2X,


        }}>
            {children}
        </NeracaTContext.Provider>
    )

}

export default function useNeracaTContext() {
    const context = useContext(NeracaTContext);
    if (!context) {
        throw new Error(
            "useNeracaTContext must be used within a NeracaTContextProvider"
        );
    }
    return context;
}
