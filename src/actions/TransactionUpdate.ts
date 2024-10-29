'use server'

import { revalidatePath } from 'next/cache'
import { Transaction } from '@/app/transaction-all/columns'
import prisma from '@/lib/dbprisma'

export async function updateTransaction(id: number, data: Partial<Transaction>) {
  try {
    // const response = await fetch(`${process.env.API_URL}/api/transaction-all/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })

    //Prisma
    const updated = await prisma.transactionAll.update({
      where: { id: id },
      data: data,
    })

    // if (!response.ok) {
    //   const error = await response.json()
    //   throw new Error(error.message || 'Failed to update transaction')
    // }
    console.log('TO UPDATE -updated: ', updated)
    revalidatePath('/transaction-all')
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteTransaction(id: number) {
  // Implement delete logic here
  try {
    // const response = await fetch(`${process.env.API_URL}/api/transaction-all/${id}`, {
    //   method: 'DELETE',
    // })
    await prisma.transactionAll.delete({
      where: { id },
    })
    // console.log('TO DELETE -response: ', response)

    revalidatePath('/transaction-all')
    return { success: true }

  } catch (error) {
    console.log('TO DELETE -error: ', error)
    return { success: false, error: (error as Error).message }
  }

}