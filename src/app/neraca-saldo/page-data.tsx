"use client";

import { Suspense, useEffect, useState } from "react";
import React from "react";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import Divider from "@/components/Divider";

import { getAccountGroups } from "@/actions/AccountAction";

import Loading from "./loading";
import NeracaDataX from "./neraca-data-x";
import NeracaDataDebit from "./neraca-data-x-debit";
import NeracaDataCredit from "./neraca-data-x-credit";
import NeracaDataX2 from "./neraca-data-x-2";
import NeracaDataTotalDK from "./neraca-data-total-dk";

interface AccountGroup {
  id: number;
  name: string;
}

export default function ShowNSData({
  title,
  accType,
  accGroup,
}: {
  title: string;
  accType: number;
  accGroup: number;
}) {
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);

  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
    useNeracaSaldoContext();
  const startPrevX = "2020-01-01";
  const newTitle = title.toUpperCase();

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getAccountGroups();
      setAccountGroups(groups);
    };
    fetchGroups();
  }, [accType]);

  return (
    <>
      <div>
        <div className="h-4"></div>

        {/* <ShowData title='Penerimaan Persembahan' accType={4} accGroup={8} />
                <div className="h-8"></div>
                <ShowData title='Penerimaan Lain-lain' accType={4} accGroup={9} />
                <div className="h-8"></div>
                <ShowData title='Biaya Operasional' accType={5} accGroup={10} />
                <div className="h-8"></div>
                <ShowData title='Biaya Sekretariat' accType={5} accGroup={11} />
                <div className="h-8"></div>
                <ShowData title='Biaya Bidang & Bapel' accType={5} accGroup={12} /> */}

        {/* <ShowData title='KAS' accType={1} accGroup={1} />
                <div className="h-8"></div>

                <ShowData title='BANK' accType={1} accGroup={2} />
                <div className="h-8"></div> */}

        {accountGroups.map((group) => (
          <React.Fragment key={group.id}>
            <ShowData
              title={group.name.toUpperCase()}
              accType={1}
              accGroup={group.id}
            />
            <div className="h-8"></div>
          </React.Fragment>
        ))}
        <Suspense fallback={<Loading section="Tab2" />}>
            <NeracaDataTotalDK start={start} end={end} />
        </Suspense>
        <div className="h-4"></div>
        <div className="h-4"></div>
      </div>
    </>
  );
}

//
function ShowData({
  title,
  accType,
  accGroup,
}: {
  title: string;
  accType: number;
  accGroup: number;
}) {
  const { start, end, startPrev, endPrev, titleMonthYear, titlePrevMonthYear } =
    useNeracaSaldoContext();
  const startPrevX = "2020-01-01";

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/2 pr-2">
          <div className="flex justify-between">
            <h2 className="text-blue-600 dark:text-orange-600 font-bold">
              {title}
            </h2>
            {/* <h2 className="text-blue-600 dark:text-orange-600 font-bold">Saldo Awal</h2> */}
          </div>
          <Divider />

          {/* kolom AKUN dan Saldo Awal */}
          <Suspense fallback={<Loading section="Tab1" />}>
            <NeracaDataX
              title="Tab1"
              titleTotal="Tab1"
              type={accType}
              group={accGroup}
              start={startPrevX}
              end={endPrev}
            />
          </Suspense>
        </div>

        <div className="w-1/2 pr-2">
          <div>
            <h2 className="text-center text-blue-600 dark:text-orange-600 font-bold">
              MUTASI
            </h2>
          </div>
          <Divider />

          <div className="flex flex-row gap-2">
            {/* kolom DEBET */}
            <Suspense fallback={<Loading section="Tab2" />}>
              <NeracaDataDebit
                title="Tab2"
                titleTotal="Tab2"
                type={accType}
                group={accGroup}
                start={start}
                end={end}
              />
            </Suspense>

            {/* kolom KREDIT */}
            <Suspense fallback={<Loading section="Tab2" />}>
              <NeracaDataCredit
                title="Tab2"
                titleTotal="Tab2"
                type={accType}
                group={accGroup}
                start={start}
                end={end}
              />
            </Suspense>
          </div>
        </div>

        {/* <div className="w-1/4"> */}
        {/* {titleMonthYear} */}
        {/* <h2 className="text-end text-blue-600 dark:text-orange-600 font-bold">Saldo Akhir</h2> */}
        {/* <Divider /> */}

        {/* kolom Saldo Akhir */}
        {/* <Suspense fallback={<Loading section="Tab3" />}> */}
        {/* <NeracaDataX2 title="Tab3" titleTotal="Tab3" type={accType} group={accGroup} start={start} end={end} /> */}
        {/* </Suspense> */}
        {/* </div> */}
      </div>

      {/* <div className="w-full">
                <Suspense fallback={<Loading section="Tab2" />}>
                    <NeracaDataTotalDebit start={start} end={end} />
                </Suspense>
                </div> */}
    </>
  );
}
