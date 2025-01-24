import { create } from "zustand"

export interface NeracaTStoreBefore {

    totalKasX: number;
    totalBankX: number;
    totalDepositoX: number;
    totalPiutangX: number;
    totalPiutangLainX: number;
    totalBonSemX: number;
    totalBiayaMukaX: number;
    totalALX: number;
    setKasX: (setKasX: number) => void;
    setBankX: (setBankX: number) => void;
    setDepositoX: (setDepositoX: number) => void;
    setPiutangX: (setPiutangX: number) => void;
    setPiutangLainX: (setPiutangLainX: number) => void;
    setBonSemX: (setBonSemX: number) => void;
    setBiayaMukaX: (setBiayaMukaX: number) => void;
    setTotalALX: (setTotalALX: number) => void;

}

export const useNeracaTStoreBefore = create<NeracaTStoreBefore>((set) => ({

    totalKasX: 0, // persembahan
    totalBankX: 0, // lain-lain/khusus
    totalDepositoX: 0,
    totalPiutangX: 0,
    totalPiutangLainX: 0,
    totalBonSemX: 0,
    totalBiayaMukaX: 0,
    totalALX: 0,
    //setTotalTerima1: (totalTerima1) => set({ totalTerima1 }),
    setKasX: (totalKasX: number) => set((state) =>
        state.totalKasX !== totalKasX ? { totalKasX } : state
    ),
    setBankX: (totalBankX: number) => set((state) =>
        state.totalBankX !== totalBankX ? { totalBankX } : state
    ),
    setDepositoX: (totalDepositoX: number) => set((state) =>
        state.totalDepositoX !== totalDepositoX ? { totalDepositoX } : state
    ),
    setPiutangX: (totalPiutangX: number) => set((state) =>
        state.totalPiutangX !== totalPiutangX ? { totalPiutangX } : state
    ),
    setPiutangLainX: (totalPiutangLainX: number) => set((state) =>
        state.totalPiutangLainX !== totalPiutangLainX ? { totalPiutangLainX } : state
    ),
    setBonSemX: (totalBonSemX: number) => set((state) =>
        state.totalBonSemX !== totalBonSemX ? { totalBonSemX } : state
    ),
    setBiayaMukaX: (totalBiayaMukaX: number) => set((state) =>
        state.totalBiayaMukaX !== totalBiayaMukaX ? { totalBiayaMukaX } : state
    ),
    setTotalALX: (totalALX: number) => set((state) =>
        state.totalALX !== totalALX ? { totalALX } : state
    ),



}))