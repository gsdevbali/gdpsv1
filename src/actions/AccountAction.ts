'use server'

import prisma from '@/lib/dbprisma'

export async function updateAccount(formData: FormData) {
  try {
      const id = parseInt(formData.get("id") as string)
      const code = formData.get("code") as string
      const name = formData.get("name") as string
      // const balance1 = formData.get("balance1") as string
      const balance1 = parseFloat(formData.get('balance1') as string) || 0; // Add this line

      const updatedAccount = await prisma.account.update({
          where: { id },
          data: {
              code,
              name,
              balance1,
              // Add other fields as needed
          },
      })

      return { success: true, data: updatedAccount }
  } catch (error) {
      console.error("Error updating account:", error)
      return { error: "Failed to update account" }
  }
}


export async function getAccounts() {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        code: true,
        name: true,
      },
      orderBy: {
        code: 'asc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    throw new Error('Failed to fetch accounts')
  }
}


export async function getAccountGroups() {
  try {
    const accounts = await prisma.accountGroup.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch accountGroup:', error)
    throw new Error('Failed to fetch accountGroup')
  }
}


export async function getAccountsType() {
  try {
    const accounts = await prisma.accountType.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch accounts type:', error)
    throw new Error('Failed to fetch accounts type')
  }
}

export async function getAccountsByGroup2(group2Id: number) {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        code: true,
        name: true,
      },
      orderBy: {
        code: 'asc',
      },
      where: {
        accountGroup2Id: group2Id
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    throw new Error('Failed to fetch accounts')
  }
}


export async function getAccountsByType(typeId: number) {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        code: true,
        name: true,
      },
      orderBy: {
        code: 'asc',
      },
      where: {
        accountTypeId: typeId
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    throw new Error('Failed to fetch accounts')
  }
}

export async function getAccountsAll() {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        code: true,
        name: true,
      },
      orderBy: {
        code: 'asc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    throw new Error('Failed to fetch accounts')
  }
}


export async function getGroup1() {
  try {
    const accounts = await prisma.accountGroup.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export async function getGroup2() {
  try {
    const accounts = await prisma.accountGroup2.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}