"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Transaction } from "./columns"
import { revalidatePath } from "next/cache"

interface EditDialogProps {
    children: React.ReactNode
    transaction: Transaction
}

export function EditDialog({ children, transaction }: EditDialogProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState(transaction)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/transaction-all/${transaction.id}`, {
                cache: 'no-store',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {

                setOpen(false)
                revalidatePath('/transaction-all')
                console.log('ID:', transaction.id)
                // You might want to add a refresh mechanism here
            }
        } catch (error) {
            console.error('Error updating transaction:', error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>UBAH Transaksi</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-left">
                                Tanggal
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={new Date(formData.date).toISOString().split('T')[0]}
                                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ref" className="text-left">
                                Referensi
                            </Label>
                            <Input
                                id="description"
                                value={formData.ref}
                                onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-left">
                                Uraian
                            </Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="debit" className="text-left">
                                Debet
                            </Label>
                            <Input
                                id="debit"
                                type="number"
                                value={formData.debit}
                                onChange={(e) => setFormData({ ...formData, debit: Number(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="credit" className="text-left">
                                Kredit
                            </Label>
                            <Input
                                id="credit"
                                type="number"
                                value={formData.credit}
                                onChange={(e) => setFormData({ ...formData, credit: Number(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" type="submit">SIMPAN PERUBAHAN</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}