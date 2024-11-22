"use client"

import { createContext, useContext, useState } from 'react';


const AppContext = createContext('');

export function TotalWrapper({children}: {
    children: React.ReactNode;
}) {

    const [state, setState] = useState('X')

    return (
        <AppContext.Provider value = {state}>
            {children}
        </AppContext.Provider>
    )

}


export function useTotalContext() {
    return useContext(AppContext);
}
