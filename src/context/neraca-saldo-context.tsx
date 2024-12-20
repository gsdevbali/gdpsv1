"use client"

import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');
const NeracaSaldoContext = createContext
    <{
        filterType: string; setFilterType: (type: string) => void;
        subTitle: string; setSubTitle: (type: string) => void;
        totalTerima: number; setTotalTerima: (type: number) => void;
        periodeOn: boolean; setPeriodeOn: (type: boolean) => void;
        start: string; setStartContext: (type: string) => void;
        end: string; setEndContext: (type: string) => void;
    }>

    ({
        filterType: 'all',
        subTitle: 'Semua',
        totalTerima: 0,
        periodeOn: false,
        start: '',
        end: '',
        setFilterType: () => { },
        setSubTitle: () => { },
        setTotalTerima: () => { },
        setPeriodeOn: () => { },
        setStartContext: () => { },
        setEndContext: () => { },

    });

export function NeracaSaldoContextProvider({ children }: {
    children: React.ReactNode;
}) {

    const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'monthly'
    const [subTitle, setSubTitle] = useState('Semua');
    const [totalTerima, setTotalTerima] = useState(0);
    const [periodeOn, setPeriodeOn] = useState(false);
    const [start, setStartContext] = useState('01-01-2000');
    const [end, setEndContext] = useState('12-31-3024');

    return (
        <NeracaSaldoContext.Provider value={{
            filterType, setFilterType,
            subTitle, setSubTitle,
            totalTerima, setTotalTerima,
            periodeOn, setPeriodeOn,
            start, setStartContext,
            end, setEndContext,
        }}>
            {children}
        </NeracaSaldoContext.Provider>
    )

}

export default function useNeracaSaldoContext() {
    const context = useContext(NeracaSaldoContext);
    if (!context) {
        throw new Error(
            "useNeracaSaldoContext must be used within a NeracaSaldoContextProvider"
        );
    }
    return context;
}
