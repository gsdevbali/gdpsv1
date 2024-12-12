"use client"

import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');
const CashFlowContext = createContext
    <{
        filterType: string; setFilterType: (type: string) => void;
        subTitleCf: string; setSubTitleCf: (type: string) => void;
        totalTerima: number; setTotalTerima: (type: number) => void;
        periodeOn: boolean; setPeriodeOn: (type: boolean) => void;
        start: string; setStartContext: (type: string) => void;
        end: string; setEndContext: (type: string) => void;
    }>

    ({
        filterType: 'all',
        subTitleCf: 'Semua',
        totalTerima: 0,
        periodeOn: false,
        start: '',
        end: '',
        setFilterType: () => { },
        setSubTitleCf: () => { },
        setTotalTerima: () => { },
        setPeriodeOn: () => { },
        setStartContext: () => { },
        setEndContext: () => { },

    });

export function CashFlowProvider({ children }: {
    children: React.ReactNode;
}) {

    const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'monthly'
    const [subTitleCf, setSubTitleCf] = useState('Semua');
    const [totalTerima, setTotalTerima] = useState(0);
    const [periodeOn, setPeriodeOn] = useState(false);
    const [start, setStartContext] = useState('01-01-2000');
    const [end, setEndContext] = useState('12-31-3024');

    return (
        <CashFlowContext.Provider value={{
            filterType, setFilterType,
            subTitleCf, setSubTitleCf,
            totalTerima, setTotalTerima,
            periodeOn, setPeriodeOn,
            start, setStartContext,
            end, setEndContext,
        }}>
            {children}
        </CashFlowContext.Provider>
    )

}

export default function useCashFlowContext() {
    const context = useContext(CashFlowContext);
    if (!context) {
        throw new Error(
            "useCashFlowContext must be used within a CashFlowContextProvider"
        );
    }
    return context;
}
