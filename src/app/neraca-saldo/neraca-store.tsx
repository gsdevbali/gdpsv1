import { create } from "zustand"

export interface NeracaStore {

    totalA: number;
    totalAL: number;
    totalATL: number;
    totalAT: number;

    totalK: number;
    totalKL: number;
    totalAB: number;

    setTotalA: (setTotalA: number) => void;
    setTotalAL: (setTotalAL: number) => void;
    setTotalATL: (setTotalATL: number) => void;
    setTotalAT: (setTotalAT: number) => void;

    setTotalK: (setTotalK: number) => void;
    setTotalKL: (setTotalKL: number) => void;
    setTotalAB: (setTotalAB: number) => void;

}

export const useNeracaStore = create<NeracaStore>((set) => ({

    totalA: 0,
    totalAL: 0,
    totalATL: 0,
    totalAT: 0,

    totalK: 0,
    totalKL: 0,
    totalAB: 0,

    //Set Aset/Aktiva
    setTotalA: (totalA: number) => set((state) => state.totalA !== totalA ? { totalA } : state),
    setTotalAL: (totalAL: number) => set((state) => state.totalAL !== totalAL ? { totalAL } : state),
    setTotalATL: (totalATL: number) => set((state) => state.totalATL !== totalATL ? { totalATL } : state),
    setTotalAT: (totalAT: number) => set((state) => state.totalAT !== totalAT ? { totalAT } : state),

    //Set Pasiva
    setTotalK: (totalK: number) => set((state) => state.totalK !== totalK ? { totalK } : state),
    setTotalKL: (totalKL: number) => set((state) => state.totalKL !== totalKL ? { totalKL } : state),
    setTotalAB: (totalAB: number) => set((state) => state.totalAB !== totalAB ? { totalAB } : state),

}))