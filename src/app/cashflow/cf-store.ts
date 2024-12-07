import { create } from "zustand"

export interface CfStore {
    totalCf: number;
    setTotalCf: (totalCf: number) => void;
}

export const useCfStore = create<CfStore>( (set)=>({
    totalCf: 0,
    setTotalCf: (totalCf: number) => set( ()=>({ totalCf }) ),
}) )