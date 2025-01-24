import { create } from "zustand"

export interface CashflowRecStore {

    totalTerima1: number;
    totalTerima2: number;
    totalTerimaAll: number;
    totalBebanOp: number;
    totalSurplus1: number;
    totalSurplus2: number;
    totalBebanPsu: number;

    setTotalTerima1: (setTotalTerima1: number) => void;
    setTotalTerima2: (setTotalTerima2: number) => void;
    setTotalTerimaAll: (setTotalTerimaAll: number) => void;
    setTotalBebanOp: (setTotalBebanOp: number) => void;
    setTotalSurplus1: (setTotalSurplus1: number) => void;
    setTotalSurplus2: (setTotalSurplus2: number) => void;
    setTotalBebanPsu: (setTotalBebanPsu: number) => void;


}

export const useCashflowRecStore = create<CashflowRecStore>((set) => ({

    totalTerima1: 0, // persembahan
    totalTerima2: 0,
    totalTerimaAll: 0, // lain-lain/khusus
    totalBebanOp: 0,
    totalSurplus1: 0,
    totalSurplus2: 0,
    totalBebanPsu: 0,

    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setTotalTerima1: (totalTerima1: number) => set((state) =>
        state.totalTerima1 !== totalTerima1 ? { totalTerima1 } : state
    ),
    setTotalTerima2: (totalTerima2: number) => set((state) =>
        state.totalTerima2 !== totalTerima2 ? { totalTerima2 } : state
    ),
    setTotalTerimaAll: (totalTerimaAll: number) => set((state) =>
        state.totalTerimaAll !== totalTerimaAll ? { totalTerimaAll } : state
    ),
    setTotalBebanOp: (totalBebanOp: number) => set((state) =>
        state.totalBebanOp !== totalBebanOp ? { totalBebanOp } : state
    ),
    setTotalSurplus1: (totalSurplus1: number) => set((state) =>
        state.totalSurplus1 !== totalSurplus1 ? { totalSurplus1 } : state
    ),
    setTotalSurplus2: (totalSurplus2: number) => set((state) =>
        state.totalSurplus2 !== totalSurplus2 ? { totalSurplus2 } : state
    ),
    setTotalBebanPsu: (totalBebanPsu: number) => set((state) =>
        state.totalBebanPsu !== totalBebanPsu ? { totalBebanPsu } : state
    ),


}))