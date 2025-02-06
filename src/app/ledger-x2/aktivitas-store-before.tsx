import { create } from "zustand"

export interface AktivasStore {

    totalTerima1X: number;
    totalTerima2X: number;
    totalBebanOpX: number;
    totalSelisihABX: number;
    totalAsetAwalX: number;
    totalAsetAkhirX: number;
    setTotalTerima1X: (setTotalTerima1X: number) => void;
    setTotalTerima2X: (setTotalTerima2X: number) => void;
    setTotalBebanOpX: (setTotalBebanOpX: number) => void;
    setTotalSelisihABX: (setTotalSelisihABX: number) => void;
    setTotalAsetAwalX: (setTotalAsetAwalX: number) => void;
    setTotalAsetAkhirX: (setTotalAsetAkhirX: number) => void;

}

export const useAktivitasStoreBefore = create<AktivasStore>((set) => ({

    totalTerima1X: 0, // persembahan
    totalTerima2X: 0, // lain-lain/khusus
    totalBebanOpX: 0,
    totalSelisihABX: 0,
    totalAsetAwalX: 0,
    totalAsetAkhirX: 0,
    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setTotalTerima1X: (totalTerima1X: number) => set((state) =>
        state.totalTerima1X !== totalTerima1X ? { totalTerima1X } : state
    ),
    setTotalTerima2X: (totalTerima2X: number) => set((state) =>
        state.totalTerima2X !== totalTerima2X ? { totalTerima2X } : state
    ),
    setTotalBebanOpX: (totalBebanOpX: number) => set((state) =>
        state.totalBebanOpX !== totalBebanOpX ? { totalBebanOpX } : state
    ),
    setTotalSelisihABX: (totalSelisihABX: number) => set((state) =>
        state.totalSelisihABX !== totalSelisihABX ? { totalSelisihABX } : state
    ),

    setTotalAsetAwalX: (totalAsetAwalX: number) => set((state) =>
        state.totalAsetAwalX !== totalAsetAwalX ? { totalAsetAwalX } : state
    ),
    setTotalAsetAkhirX: (totalAsetAkhirX: number) => set((state) =>
        state.totalAsetAkhirX !== totalAsetAkhirX ? { totalAsetAkhirX } : state
    ),

}))