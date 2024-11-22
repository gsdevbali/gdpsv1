
export async function getRL(accountTypeId: number, accountGroup2Id: number) {
    // const res = await fetch(`${global.baseUrl}/api/neraca?accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`, {
    //     cache: 'no-store'
    // })
    const res = await fetch(`${process.env.APP_URL}/api/neraca?accountTypeId=${accountTypeId}&accountGroup2Id=${accountGroup2Id}`, {
        cache: 'no-store'
    })

    const data = await res.json()
    return {
        accounts: data.accounts,
        totalBalance: data.totalBalance
    }
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