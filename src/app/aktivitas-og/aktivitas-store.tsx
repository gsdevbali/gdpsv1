import { create } from "zustand"

export interface AktivasStore {

    totalTerima1: number;
    totalTerima2: number;
    totalBebanOp: number;
    totalBeban2: number,
    totalBeban3: number,
    totalSelisihAB: number;
    totalAsetAwal: number;
    totalAsetAkhir: number;
    setTotalTerima1: (setTotalTerima1: number) => void;
    setTotalTerima2: (setTotalTerima2: number) => void;
    setTotalBebanOp: (setTotalBebanOp: number) => void;
    setTotalBeban2: (setTotalBeban2: number) => void;
    setTotalBeban3: (setTotalBeban3: number) => void;
    setTotalSelisihAB: (setTotalSelisihAB: number) => void;
    setTotalAsetAwal: (setTotalAsetAwal: number) => void;
    setTotalAsetAkhir: (setTotalAsetAkhir: number) => void;

}

export const useAktivitasStore = create<AktivasStore>((set) => ({

    totalTerima1: 0, // persembahan
    totalTerima2: 0, // lain-lain/khusus
    totalBebanOp: 0,
    totalBeban2: 0,
    totalBeban3: 0,
    totalSelisihAB: 0,
    totalAsetAwal: 0,
    totalAsetAkhir: 0,
    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setTotalTerima1: (totalTerima1: number) => set((state) =>
    // state.totalTerima1 !== totalTerima1 ? { totalTerima1 } : state
    {
        if (state.totalTerima1 !== totalTerima1) {
            return { totalTerima1 };
        }
        return state; // Return the unchanged state to prevent re-render
    }
    ),
    setTotalTerima2: (totalTerima2: number) => set((state) =>
        state.totalTerima2 !== totalTerima2 ? { totalTerima2 } : state


    ),
    setTotalBebanOp: (totalBebanOp: number) => set((state) =>
        state.totalBebanOp !== totalBebanOp ? { totalBebanOp } : state
    ),
    setTotalBeban2: (totalBeban2: number) => set((state) =>
    // state.totalBeban2 !== totalBeban2 ? { totalBeban2 } : state
    {
        if (state.totalBeban2 !== totalBeban2) {
            return { totalBeban2 };
        }
        return state; // Return the unchanged state to prevent re-render
    }
    ),
    setTotalBeban3: (totalBeban3: number) => set((state) =>
        state.totalBeban3 !== totalBeban3 ? { totalBeban3 } : state
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