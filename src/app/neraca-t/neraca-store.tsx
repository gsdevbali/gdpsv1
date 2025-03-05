import { create } from "zustand"

export interface NeracaStore {

    totalA: number;
    totalAL: number;
    totalATL: number;
    totalAT: number;
    totalAP: number;

    totalAT1: number;
    totalAT2: number;
    totalAT3: number;
    totalAT4: number;

    totalK: number;
    totalKL: number;
    totalAB: number;
    totalAB2: number;

    setTotalA: (setTotalA: number) => void;
    setTotalAL: (setTotalAL: number) => void;
    setTotalATL: (setTotalATL: number) => void;
    setTotalAT: (setTotalAT: number) => void;
    setTotalAP: (setTotalAP: number) => void;

    setTotalAT1: (setTotalAT1: number) => void;
    setTotalAT2: (setTotalAT2: number) => void;
    setTotalAT3: (setTotalAT3: number) => void;
    setTotalAT4: (setTotalAT4: number) => void;

    setTotalK: (setTotalK: number) => void;
    setTotalKL: (setTotalKL: number) => void;
    setTotalAB: (setTotalAB: number) => void;
    setTotalAB2: (setTotalAB2: number) => void;

}

export const useNeracaStore = create<NeracaStore>((set) => ({

    totalA: 0,
    totalAL: 0,
    totalATL: 0,
    totalAT: 0,
    totalAP: 0,

    totalAT1: 0,
    totalAT2: 0,
    totalAT3: 0,
    totalAT4: 0,

    totalK: 0,
    totalKL: 0,
    totalAB: 0,
    totalAB2: 0,

    //Set Aset/Aktiva
    setTotalA: (totalA: number) => set((state) => state.totalA !== totalA ? { totalA } : state),
    setTotalAL: (totalAL: number) => set((state) => state.totalAL !== totalAL ? { totalAL } : state),
    setTotalATL: (totalATL: number) => set((state) => state.totalATL !== totalATL ? { totalATL } : state),
    setTotalAT: (totalAT: number) => set((state) => state.totalAT !== totalAT ? { totalAT } : state),
    setTotalAP: (totalAP: number) => set((state) => state.totalAP !== totalAP ? { totalAP } : state),

    setTotalAT1: (totalAT1: number) => set((state) => state.totalAT1 !== totalAT1 ? { totalAT1 } : state),
    setTotalAT2: (totalAT2: number) => set((state) => state.totalAT2 !== totalAT2 ? { totalAT2 } : state),
    setTotalAT3: (totalAT3: number) => set((state) => state.totalAT3 !== totalAT3 ? { totalAT3 } : state),
    setTotalAT4: (totalAT4: number) => set((state) => state.totalAT4 !== totalAT4 ? { totalAT4 } : state),

    //Set Pasiva
    setTotalK: (totalK: number) => set((state) => state.totalK !== totalK ? { totalK } : state),
    setTotalKL: (totalKL: number) => set((state) => state.totalKL !== totalKL ? { totalKL } : state),
    setTotalAB: (totalAB: number) => set((state) => state.totalAB !== totalAB ? { totalAB } : state),
    setTotalAB2: (totalAB2: number) => set((state) => state.totalAB2 !== totalAB2 ? { totalAB2 } : state),

}))