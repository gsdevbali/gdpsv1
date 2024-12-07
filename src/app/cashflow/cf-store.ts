import { create } from "zustand"

export interface CfStore {
    totalCf: number;

    totalTerima1: number;
    totalTerima2: number;
    totalTerima3: number;
    totalKeluar1: number;
    totalKeluar2: number;
    totalKeluar3: number;
    
    setTotalCf: (totalCf: number) => void;

    setTotalT1: (setTotalT1: number) => void;
    setTotalT2: (setTotalT2: number) => void;
    setTotalT3: (setTotalT3: number) => void;
    
    setTotalK1: (setTotalK1: number) => void;
    setTotalK2: (setTotalK2: number) => void;
    setTotalK3: (setTotalK3: number) => void;
    
}

export const useCfStore = create<CfStore>( (set)=>({
    totalCf: 0,
    setTotalCf: (totalCf: number) => set( ()=>({ totalCf }) ),

    totalTerima1: 0,
    totalTerima2: 0,
    totalTerima3: 0,

    totalKeluar1: 0,
    totalKeluar2: 0,
    totalKeluar3: 0,


    setTotalT1: (totalTerima1: number) => set( ()=>({ totalTerima1 }) ),
    setTotalT2: (totalTerima2: number) => set( ()=>({ totalTerima2 }) ),
    setTotalT3: (totalTerima3: number) => set( ()=>({ totalTerima3 }) ),

    setTotalK1: (totalKeluar1: number) => set( ()=>({ totalKeluar1 }) ),
    setTotalK2: (totalKeluar2: number) => set( ()=>({ totalKeluar2 }) ),
    setTotalK3: (totalKeluar3: number) => set( ()=>({ totalKeluar3 }) ),


}) )