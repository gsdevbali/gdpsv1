import { createContext, useContext, useState } from 'react';

//const CashFlowContext = createContext('dataX1');
const CashFlowContext = createContext<{ filterType: string; setFilterType: (type: string) => void }>({
    filterType: 'all',
    setFilterType: () => {},
  });

export function CashFlowProvider({ children }: {
    children: React.ReactNode;
}) {

    const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'monthly'

    return (
        <CashFlowContext.Provider value={{ filterType, setFilterType }}>
            {children}
        </CashFlowContext.Provider>
    )

}

export function useCashFlowContext() {
    return useContext(CashFlowContext);
}
