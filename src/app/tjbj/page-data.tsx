"use client";

import { Suspense } from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import Divider from "@/components/Divider";
import toidr from "@/lib/toidr";
import Loading from "@/components/Loading";
import useAktivitasContext from "@/context/aktivitas-context";

import NeracaData from "./neraca-data";
import SubTotalTerima from "./total-terima";
import SubTotalRekap from "./total-rekap";

export default function ShowData({
  title,
  start,
  end,
}: {
  title: string;
  start: string;
  end: string;
}) {
  return (
    <>
      <div>
        <div className="h-4"></div>
        <ShowNSData title="Penerimaan Persembahan" accType={4} accGroup={8} />
        <div className="h-8"></div>
        <ShowDataTotal />
        <div className="h-4"></div>
      </div>
    </>
  );
}

//
function ShowNSData({
  title,
  accType,
  accGroup,
}: {
  title: string;
  accType: number;
  accGroup: number;
}) {
  const { totalTerima1, totalTerima2 } = useAktivitasContext();
  const { start, end } = useNeracaSaldoContext();

  const subValue =
    // accGroup === 8 ? totalTerima1 : accGroup === 9 ? totalTerima2 : 0;
    accGroup === 8 ? totalTerima1 : totalTerima2;

  return (
    <>
      <div className="flex flex-row">

        <div className="w-full pr-2">
          <div className="flex justify-between">
            <h2 className="text-blue-600 dark:text-orange-600 text-lg font-bold">
              {title}
            </h2>
            {/* <h2 className="text-blue-600 dark:text-orange-600 font-bold">Saldo Awal</h2> */}
          </div>
          <Divider />

          {/* Data */}
          <Suspense fallback={<Loading section="Tab1" />}>
            <NeracaData
              key={title}
              type={accType}
              group2={accGroup}
              start={start}
              end={end}
            />
            <SubTotalTerima value={toidr(subValue)} title={title} />
          </Suspense>
        </div>

      </div>
    </>
  );
}

//
function ShowDataTotal() {
  const { totalTerima1 } = useAktivitasContext();

  const totalPenerimaan = totalTerima1;
  const totalKlasis = 0.04 * totalPenerimaan;
  const totalSinwil = 0.1 * totalPenerimaan;

  return (
    <>
      <div className="bg-slate-300 dark:bg-gray-800 p-4 rounded-md shadow-md">
        <SubTotalRekap
          value={toidr(totalPenerimaan)}
          title="Total Penerimaan Persembahan"
        />
        <SubTotalRekap
          value={toidr(totalKlasis)}
          title="Total TJBJ Klasis (4%)"
        />
        <SubTotalRekap
          value={toidr(totalSinwil)}
          title="Total TJBJ Sinwil (10%)"
        />
        <Divider />
      </div>
    </>
  );
}
