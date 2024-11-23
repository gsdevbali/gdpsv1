"use client"

import { createContext, useContext, useState } from 'react';


const AppContext = createContext('dataX1');

export function TotalRLDetailContext({ children }: {
    children: React.ReactNode;
}) {

    const [state] = useState('dataX1')

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )

}


export function useTotalRLDetail() {
    return useContext(AppContext);
}
