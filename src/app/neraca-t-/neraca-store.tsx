import { create } from "zustand"

export interface NeracaTStore {

    totalKas: number;
    totalBank: number;
    totalDeposito: number;
    totalPiutang: number;
    totalPiutangLain: number;
    totalBonSem: number;
    totalBiayaMuka: number;
    totalAL: number;
    setKas: (setKas: number) => void;
    setBank: (setBank: number) => void;
    setDeposito: (setDeposito: number) => void;
    setPiutang: (setPiutang: number) => void;
    setPiutangLain: (setPiutangLain: number) => void;
    setBonSem: (setBonSem: number) => void;
    setBiayaMuka: (setBiayaMuka: number) => void;
    setTotalAL: (setTotalAL: number) => void;

}

export const useNeracaTStore = create<NeracaTStore>((set) => ({

    totalKas: 0, // persembahan
    totalBank: 0, // lain-lain/khusus
    totalDeposito: 0,
    totalPiutang: 0,
    totalPiutangLain: 0,
    totalBonSem: 0,
    totalBiayaMuka: 0,
    totalAL: 0,
    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setKas: (totalKas: number) => set((state) =>
        state.totalKas !== totalKas ? { totalKas } : state
    ),
    setBank: (totalBank: number) => set((state) =>
        state.totalBank !== totalBank ? { totalBank } : state
    ),
    setDeposito: (totalDeposito: number) => set((state) =>
        state.totalDeposito !== totalDeposito ? { totalDeposito } : state
    ),
    setPiutang: (totalPiutang: number) => set((state) =>
        state.totalPiutang !== totalPiutang ? { totalPiutang } : state
    ),
    setPiutangLain: (totalPiutangLain: number) => set((state) =>
        state.totalPiutangLain !== totalPiutangLain ? { totalPiutangLain } : state
    ),
    setBonSem: (totalBonSem: number) => set((state) =>
        state.totalBonSem !== totalBonSem ? { totalBonSem } : state
    ),
    setBiayaMuka: (totalBiayaMuka: number) => set((state) =>
        state.totalBiayaMuka !== totalBiayaMuka ? { totalBiayaMuka } : state
    ),
    setTotalAL: (totalAL: number) => set((state) =>
        state.totalAL !== totalAL ? { totalAL } : state
    ),


}))