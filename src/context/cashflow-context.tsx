"use client"

import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');
const CashFlowContext = createContext
    <{
        filterType: string; setFilterType: (type: string) => void;
        totalTerima: number; setTotalTerima: (type: number) => void;
    }>

    ({
        filterType: 'all',
        totalTerima: 0,
        setFilterType: () => { },
        setTotalTerima: () => { },
    });

export function CashFlowProvider({ children }: {
    children: React.ReactNode;
}) {

    const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'monthly'
    const [totalTerima, setTotalTerima] = useState(0);

    return (
        <CashFlowContext.Provider value={{ filterType, setFilterType, totalTerima, setTotalTerima }}>
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
