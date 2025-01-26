import { create } from "zustand"

export interface NeracaStoreX {

    totalAX: number;
    totalALX: number;
    totalATLX: number;
    totalATX: number;

    totalKX: number;
    totalKLX: number;
    totalABX: number;
    totalAB2X: number;

    setTotalAX: (setTotalA: number) => void;
    setTotalALX: (setTotalAL: number) => void;
    setTotalATLX: (setTotalATL: number) => void;
    setTotalATX: (setTotalAT: number) => void;

    setTotalKX: (setTotalK: number) => void;
    setTotalKLX: (setTotalKL: number) => void;
    setTotalABX: (setTotalAB: number) => void;
    setTotalAB2X: (setTotalAB2: number) => void;

}

export const useNeracaStoreX = create<NeracaStoreX>((set) => ({

    totalAX: 0,
    totalALX: 0,
    totalATLX: 0,
    totalATX: 0,

    totalKX: 0,
    totalKLX: 0,
    totalABX: 0,
    totalAB2X: 0,

    //Set Aset/Aktiva
    setTotalAX: (totalAX: number) => set((state) => state.totalAX !== totalAX ? { totalAX } : state),
    setTotalALX: (totalALX: number) => set((state) => state.totalALX !== totalALX ? { totalALX } : state),
    setTotalATLX: (totalATLX: number) => set((state) => state.totalATLX !== totalATLX ? { totalATLX } : state),
    setTotalATX: (totalATX: number) => set((state) => state.totalATX !== totalATX ? { totalATX } : state),

    //Set Pasiva
    setTotalKX: (totalKX: number) => set((state) => state.totalKX !== totalKX ? { totalKX } : state),
    setTotalKLX: (totalKLX: number) => set((state) => state.totalKLX !== totalKLX ? { totalKLX } : state),
    setTotalABX: (totalABX: number) => set((state) => state.totalABX !== totalABX ? { totalABX } : state),
    setTotalAB2X: (totalAB2X: number) => set((state) => state.totalAB2X !== totalAB2X ? { totalAB2X } : state),

}))