"use client"

import { createContext, useContext, useState } from 'react';


const AppContext = createContext({
    x1data: 'X1'
});

export function TotaRLDetaillWrapper({children}: {
    children: React.ReactNode;
}) {

    const [state, setState] = useState({
        x1data:'X1'
    })

    return (
        <AppContext.Provider value = {
            state
        }>
            {children}
        </AppContext.Provider>
    )

}


export function useTotalRLDetail(){
    return useContext(AppContext);
}
