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
import { useEffect, useState } from "react"
import { Transaction } from "./columns"
import { Trash2Icon } from "lucide-react"
import { CurrencyInput } from "@/components/currency-input"
import { getAccounts } from "@/actions/AccountAction"
//import { revalidatePath } from "next/cache"

interface Account {
    id: number;
    code: string;
    name: string;
}
interface EditDialogProps {
    children: React.ReactNode
    transaction: Transaction
}

export function EditDialog({ children, transaction }: EditDialogProps) {
    // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [open, setOpen] = useState(false)
    //const [formData, setFormData] = useState(transaction)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const { toast }: any = useToast()
    const [accounts, setAccounts] = useState<Account[]>([])
    const [selectedAccountId, setSelectedAccountId] = useState(transaction.accountId)


    useEffect(() => {

        const fetchAccounts = async () => {
            try {
                const fetchedAccounts = await getAccounts();
                setAccounts(fetchedAccounts);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    // Log initial selectedAccountId
    // useEffect(() => {
    //     console.log('Initial selectedAccountId:', selectedAccountId);
    // }, []);

    async function handleFormAction(formData: FormData) {

        setIsSubmitting(true);
        // console.log('Before setting accountId:', formData.get('accountId'));
        formData.set('accountId', selectedAccountId.toString())
        // console.log('After setting accountId:', formData.get('accountId'));
        // Create a new FormData instance to avoid mutation issues
        const updatedFormData = new FormData();
        // Copy all existing form data
        Array.from(formData.entries()).forEach(([key, value]) => {
            updatedFormData.append(key, value);
        });
        // for (const [key, value] of formData.entries()) {
        //     updatedFormData.append(key, value);
        // }
        // Explicitly set the accountId
        updatedFormData.set('accountId', selectedAccountId.toString());


        try {
            //const result = await updateTransaction(formData)
            const result = await updateTransaction(updatedFormData);
            // console.log('Update Result:', result);

            if (!result || result.error) {
                toast({
                    title: "Gagal",
                    description: result?.error || "Terjadi kesalahan saat memperbarui transaksi",
                    variant: "destructive",
                })
                return
            }

            setIsSubmitting(false);
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
            setIsSubmitting(false);
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
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
                    <DialogHeader>
                        <DialogTitle>UBAH Transaksi</DialogTitle>
                    </DialogHeader>
                    {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
                    <form action={handleFormAction} className="space-y-4">
                        <input type="hidden" name="id" value={transaction.id} />
                        <div className="grid gap-4 py-4">
                            <select
                                name='accountId'
                                value={selectedAccountId}
                                onChange={(e) => {
                                    const newValue = Number(e.target.value)
                                    setSelectedAccountId(newValue)
                                    // console.log('New selectedAccountId:', newValue)

                                }
                                }

                                required
                                className='border p-2 rounded w-[100%] md:w-[100%] h-[40px]'
                            >
                                <option value="">Pilih Akun</option>
                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.code} - {account.name}
                                    </option>
                                ))}
                            </select>
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
                            <Button variant="destructive" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
                            </Button>
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
                            Tindakan ini tidak dapat dibatalkan.
                            <br />Transaksi ini akan dihapus secara permanen.
                            <br />Akan berpengaruh pada posisi Saldo Akun.
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