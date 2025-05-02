import { create } from "zustand"

export interface CashflowRecStoreBefore {

    totalTerima1X: number;
    totalTerima2X: number;
    totalTerimaAllX: number;
    totalBebanOpX: number;
    totalSurplus1X: number;
    totalSurplus2X: number;
    totalBebanPsuX: number;

    setTotalTerima1X: (setTotalTerima1X: number) => void;
    setTotalTerima2X: (setTotalTerima2X: number) => void;
    setTotalTerimaAllX: (setTotalTerimaAllX: number) => void;
    setTotalBebanOpX: (setTotalBebanOpX: number) => void;
    setTotalSurplus1X: (setTotalSurplus1X: number) => void;
    setTotalSurplus2X: (setTotalSurplus2X: number) => void;
    setTotalBebanPsuX: (setTotalBebanPsuX: number) => void;


}

export const useCashflowRecStoreBefore = create<CashflowRecStoreBefore>((set) => ({

    totalTerima1X: 0, // persembahan
    totalTerima2X: 0, // lain-lain/khusus
    totalTerimaAllX: 0,
    totalBebanOpX: 0,
    totalSurplus1X: 0,
    totalSurplus2X: 0,
    totalBebanPsuX: 0,

    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setTotalTerima1X: (totalTerima1X: number) => set((state) =>
        state.totalTerima1X !== totalTerima1X ? { totalTerima1X } : state
    ),
    setTotalTerima2X: (totalTerima2X: number) => set((state) =>
        state.totalTerima2X !== totalTerima2X ? { totalTerima2X } : state
    ),
    setTotalTerimaAllX: (totalTerimaAllX: number) => set((state) =>
        state.totalTerimaAllX !== totalTerimaAllX ? { totalTerimaAllX } : state
    ),
    setTotalBebanOpX: (totalBebanOpX: number) => set((state) =>
        state.totalBebanOpX !== totalBebanOpX ? { totalBebanOpX } : state
    ),
    setTotalSurplus1X: (totalSurplus1X: number) => set((state) =>
        state.totalSurplus1X !== totalSurplus1X ? { totalSurplus1X } : state
    ),
    setTotalSurplus2X: (totalSurplus2X: number) => set((state) =>
        state.totalSurplus2X !== totalSurplus2X ? { totalSurplus2X } : state
    ),
    setTotalBebanPsuX: (totalBebanPsuX: number) => set((state) =>
        state.totalBebanPsuX !== totalBebanPsuX ? { totalBebanPsuX } : state
    ),


}))