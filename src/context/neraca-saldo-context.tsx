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
        startPrev: string; setPrevStartContext: (type: string) => void;
        endPrev: string; setPrevEndContext: (type: string) => void;
        titleMonthYear: string; setTitleMonthYear: (type: string) => void;
        titlePrevMonthYear: string; setPrevTitleMonthYear: (type: string) => void;
        titleMY: string; setTitleMY: (type: string) => void;
    }>

    ({
        filterType: 'all',
        subTitle: 'Semua',
        totalTerima: 0,
        periodeOn: false,
        start: '',
        end: '',
        startPrev: '',
        endPrev: '',
        titleMonthYear: '',
        titlePrevMonthYear: '',
        titleMY: '',
        setFilterType: () => { },
        setSubTitle: () => { },
        setTotalTerima: () => { },
        setPeriodeOn: () => { },
        setStartContext: () => { },
        setEndContext: () => { },
        setPrevStartContext: () => { },
        setPrevEndContext: () => { },
        setTitleMonthYear: () => { },
        setPrevTitleMonthYear: () => { },
        setTitleMY: () => { },

    });

export function NeracaSaldoProvider({ children }: {
    children: React.ReactNode;
}) {

    const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'monthly'
    const [subTitle, setSubTitle] = useState('-');
    const [totalTerima, setTotalTerima] = useState(0);
    const [periodeOn, setPeriodeOn] = useState(false);
    const [start, setStartContext] = useState('01-01-2000');
    const [end, setEndContext] = useState('12-31-9924');
    const [startPrev, setPrevStartContext] = useState('01-01-2000');
    const [endPrev, setPrevEndContext] = useState('12-31-9924');
    const [titleMonthYear, setTitleMonthYear] = useState('');
    const [titlePrevMonthYear, setPrevTitleMonthYear] = useState('');
    const [titleMY, setTitleMY] = useState('MoM');

    return (
        <NeracaSaldoContext.Provider value={{
            filterType, setFilterType,
            subTitle, setSubTitle,
            totalTerima, setTotalTerima,
            periodeOn, setPeriodeOn,
            start, setStartContext,
            end, setEndContext,
            startPrev, setPrevStartContext,
            endPrev, setPrevEndContext,
            titleMonthYear, setTitleMonthYear,
            titlePrevMonthYear, setPrevTitleMonthYear,
            titleMY, setTitleMY,
        }}>
            {children}
        </NeracaSaldoContext.Provider>
    )

}

export default function useNeracaSaldoContext() {
    const context = useContext(NeracaSaldoContext);
    if (!context) {
        throw new Error(
            "useNeracaSaldoContext must be used within a NeracaSaldoProvider"
        );
    }
    return context;
}
