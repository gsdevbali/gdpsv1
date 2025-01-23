import { create } from "zustand"

export interface AktivasStore {

    totalTerima1: number;
    totalTerima2: number;
    totalBebanOp: number;
    totalSelisihAB: number;
    totalAsetAwal: number;
    totalAsetAkhir: number;
    setTotalTerima1: (setTotalTerima1: number) => void;
    setTotalTerima2: (setTotalTerima1: number) => void;
    setTotalBebanOp: (setTotalBebanOp: number) => void;
    setTotalSelisihAB: (setTotalSelisihAB: number) => void;
    setTotalAsetAwal: (setTotalAsetAwal: number) => void;
    setTotalAsetAkhir: (setTotalAsetAkhir: number) => void;

}

export const useAktivitasStoreBefore = create<AktivasStore>((set) => ({

    totalTerima1: 0, // persembahan
    totalTerima2: 0, // lain-lain/khusus
    totalBebanOp: 0,
    totalSelisihAB: 0,
    totalAsetAwal: 0,
    totalAsetAkhir: 0,
    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setTotalTerima1: (totalTerima1: number) => set((state) =>
        state.totalTerima1 !== totalTerima1 ? { totalTerima1 } : state
    ),
    setTotalTerima2: (totalTerima2: number) => set((state) =>
        state.totalTerima2 !== totalTerima2 ? { totalTerima2 } : state
    ),
    setTotalBebanOp: (totalBebanOp: number) => set((state) =>
        state.totalBebanOp !== totalBebanOp ? { totalBebanOp } : state
    ),
    setTotalSelisihAB: (totalSelisihAB: number) => set((state) =>
        state.totalSelisihAB !== totalSelisihAB ? { totalSelisihAB } : state
    ),

    setTotalAsetAwal: (totalAsetAwal: number) => set((state) =>
        state.totalAsetAwal !== totalAsetAwal ? { totalAsetAwal } : state
    ),
    setTotalAsetAkhir: (totalAsetAkhir: number) => set((state) =>
        state.totalAsetAkhir !== totalAsetAkhir ? { totalAsetAkhir } : state
    ),

}))