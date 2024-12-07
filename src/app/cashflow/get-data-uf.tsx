"use client"

import React, { useEffect, useState } from 'react';

export function getRLuf(accountTypeId: number, accountGroup2Id: number) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.APP_URL}/api/neraca?accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`, {
                cache: 'no-store'
            });
            const result = await res.json();
            setData(result);
        };

        fetchData();
    }, [accountTypeId, accountGroup2Id]);

    return data ? {
        accounts: data.accounts,
        totalBalance: data.totalBalance
    } : null;
}


export async function getNeracaGroup1(accountTypeId: number, accountGroup1Id: number) {
    // const res = await fetch(`${global.baseUrl}/api/neraca?accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`, {
    //     cache: 'no-store'
    // })
    const res = await fetch(`${process.env.APP_URL}/api/neraca?accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup1Id}`, {
        cache: 'no-store'
    })

    const data = await res.json()
    return {
        accounts: data.accounts,
        totalBalance: data.totalBalance
    }
}