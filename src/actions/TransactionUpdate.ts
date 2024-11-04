'use server'

import { Transaction } from '@/app/transaction-all/columns'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/dbprisma'

export async function updateTransaction(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const date = new Date(formData.get('date') as string)
    const ref = formData.get('ref') as string
    const description = formData.get('description') as string
    const debit = Number(formData.get('debit'))
    const credit = Number(formData.get('credit'))
    const accountId = Number(formData.get('accountId'))

    const transaction = await prisma.transactionAll.update({
      where: { id: Number(id) },
      data: { date, ref, description, debit, credit, accountId },
    })

    revalidatePath('/transactions-all') // Adjust this path to match your route
    return { success: true, data: transaction }
  } catch (error) {
    return { error: 'Failed to update transaction' }
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