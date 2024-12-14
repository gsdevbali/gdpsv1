import { create } from "zustand"

export interface CfStore {
    
    totalTerima1: number;
    totalTerima2: number;
    totalTerima3: number;
    totalKeluar1: number;
    totalKeluar2: number;
    totalKeluar3: number;
        
    setTotalT1: (setTotalT1: number) => void;
    setTotalT2: (setTotalT2: number) => void;
    setTotalT3: (setTotalT3: number) => void;
    
    setTotalK1: (setTotalK1: number) => void;
    setTotalK2: (setTotalK2: number) => void;
    setTotalK3: (setTotalK3: number) => void;
    
}

export const useCfStore = create<CfStore>( (set)=>({
    
    totalTerima1: 0,
    totalTerima2: 0,
    totalTerima3: 0,

    totalKeluar1: 0,
    totalKeluar2: 0,
    totalKeluar3: 0,

    // setTotalT1: (totalTerima1: number) => set( ()=>({ totalTerima1 }) ),
    // setTotalT2: (totalTerima2: number) => set( ()=>({ totalTerima2 }) ),
    // setTotalT3: (totalTerima3: number) => set( ()=>({ totalTerima3 }) ),

    // setTotalK1: (totalKeluar1: number) => set( ()=>({ totalKeluar1 }) ),
    // setTotalK2: (totalKeluar2: number) => set( ()=>({ totalKeluar2 }) ),
    // setTotalK3: (totalKeluar3: number) => set( ()=>({ totalKeluar3 }) ),
    // Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.


    // New codes:

    //Set Penerimaan
    setTotalT1: (totalTerima1: number) => set((state) => state.totalTerima1 !== totalTerima1 ? { totalTerima1 } : state),
    setTotalT2: (totalTerima2: number) => set((state) => state.totalTerima2 !== totalTerima2 ? { totalTerima2 } : state),
    setTotalT3: (totalTerima3: number) => set((state) => state.totalTerima3 !== totalTerima3 ? { totalTerima3 } : state),

    //Set Biaya/Pengeluaran
    setTotalK1: (totalKeluar1: number) => set((state) => state.totalKeluar1 !== totalKeluar1 ? { totalKeluar1 } : state),
    setTotalK2: (totalKeluar2: number) => set((state) => state.totalKeluar2 !== totalKeluar2 ? { totalKeluar2 } : state),
    setTotalK3: (totalKeluar3: number) => set((state) => state.totalKeluar3 !== totalKeluar3 ? { totalKeluar3 } : state),

}) )