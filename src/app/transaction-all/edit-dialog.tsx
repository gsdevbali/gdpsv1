"use client"

import { updateTransaction, deleteTransaction } from "@/actions/TransactionUpdate"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Transaction } from "./columns"
import { Trash2Icon } from "lucide-react"
import { CurrencyInput } from "@/components/currency-input"
//import { revalidatePath } from "next/cache"

interface EditDialogProps {
    children: React.ReactNode
    transaction: Transaction
}

export function EditDialog({ children, transaction }: EditDialogProps) {
    const [open, setOpen] = useState(false)
    //const [formData, setFormData] = useState(transaction)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const { toast }: any = useToast()


    async function handleFormAction(formData: FormData) {
        try {
            const result = await updateTransaction(formData)
            
            if (!result || result.error) {
                toast({
                    title: "Gagal",
                    description: result?.error || "Terjadi kesalahan saat memperbarui transaksi",
                    variant: "destructive",
                })
                return
            }

            toast({
                title: "Berhasil",
                description: "Transaksi telah diperbarui",
                variant: "default",
            })

            setOpen(false)
        } catch (error) {
            toast({
                title: "Gagal",
                description: "Terjadi kesalahan saat memperbarui transaksi",
                variant: "destructive",
            })
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteAlert(true)
    }

    const handleDelete = async () => {
        try {
            const result = await deleteTransaction(transaction.id)
            
            if (!result || result.error) {
                toast({
                    title: "Gagal",
                    description: result?.error || "Terjadi kesalahan saat menghapus transaksi",
                    variant: "destructive",
                })
                return
            }

            toast({
                title: "Berhasil",
                description: "Transaksi telah dihapus",
                variant: "default",
            })
            
            setOpen(false)
            setShowDeleteAlert(false)
            //window.location.reload() // Temporary solution - better to use React state management
        } catch (error) {
            console.error('Error deleting transaction:', error)
            toast({
                title: "Gagal",
                description: "Terjadi kesalahan saat menghapus transaksi",
                variant: "destructive",
            })
        }
    }

    return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>UBAH Transaksi</DialogTitle>
                </DialogHeader>
                {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
                <form action={handleFormAction} className="space-y-4">
                    <input type="hidden" name="id" value={transaction.id} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-left">
                                Tanggal
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                //value={new Date(formData.date).toISOString().split('T')[0]}
                                //onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                                defaultValue={new Date(transaction.date).toISOString().split('T')[0]}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ref" className="text-left">
                                Referensi
                            </Label>
                            <Input
                                id="ref"
                                name="ref"
                                //value={formData.ref}
                                //onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                                defaultValue={transaction.ref}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-left">
                                Uraian
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                //value={formData.description}
                                //onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                defaultValue={transaction.description}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="debit" className="text-left">
                                Debet
                            </Label>
                            {/* <Input
                                id="debit"
                                name="debit"
                                type="number"
                                //value={formData.debit}
                                //onChange={(e) => setFormData({ ...formData, debit: Number(e.target.value) })}
                                defaultValue={transaction.debit}
                                className="col-span-3"
                            /> */}
                            <div className="col-span-3 w-full">
                                <CurrencyInput
                                id="debit"
                                name="debit"
                                defaultValue={transaction.debit}
                                //className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="credit" className="text-left">
                                Kredit
                            </Label>
                            {/* <Input
                                id="credit"
                                name="credit"
                                type="number"
                                //value={formData.credit}
                                //onChange={(e) => setFormData({ ...formData, credit: Number(e.target.value) })}
                                defaultValue={transaction.credit}
                                className="col-span-3"
                            /> */}
                            <div className="col-span-3 w-full">
                                <CurrencyInput
                                id="credit"
                                name="credit"
                                defaultValue={transaction.credit}
                                className="col-span-3"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2">
                        <Button variant="link" onClick={handleDeleteClick}>{<Trash2Icon />}</Button>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" type="submit">SIMPAN PERUBAHAN</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        
        {/* Alert before Delete */}
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Transaksi ini akan dihapus secara permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    )
}