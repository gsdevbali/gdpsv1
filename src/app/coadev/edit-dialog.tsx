"use client";

import {
  updateTransaction,
  deleteTransaction,
} from "@/actions/TransactionUpdate";
import { updateAccount } from "@/actions/AccountAction"; // You'll need to create this

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
// import { Transaction } from "./columns";
import { Trash2Icon } from "lucide-react";
import { CurrencyInput } from "@/components/currency-input";
import { getAccounts } from "@/actions/AccountAction";
//import { revalidatePath } from "next/cache"

// interface Account {
//     id: number;
//     code: string;
//     name: string;
// }

interface Account {
  id: number;
  code: string;
  name: string;
  accountTypeId: number;
  accountGroupId: number;
  accountGroup2Id: number;
}

// interface EditDialogProps {
//     children: React.ReactNode
//     transaction: Transaction
// }

interface EditDialogProps {
  children: React.ReactNode;
  account: Account;
  // onSuccess?: () => void; 
}

export function EditDialog({ children, account }: EditDialogProps) {
  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  //const [formData, setFormData] = useState(transaction)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { toast }: any = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState(
    account.id
  );
  const balancedefault = 0; // Set default value for balance

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const fetchedAccounts = await getAccounts();
//         setAccounts(fetchedAccounts);
//       } catch (error) {
//         console.error("Failed to fetch accounts:", error);
//       }
//     };

//     fetchAccounts();
//   }, []);

  // Log initial selectedAccountId
  // useEffect(() => {
  //     console.log('Initial selectedAccountId:', selectedAccountId);
  // }, []);

  async function handleFormAction(formData: FormData) {
    setIsSubmitting(true);
    // console.log('Before setting accountId:', formData.get('accountId'));
    formData.set("accountId", selectedAccountId.toString());
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
    updatedFormData.set("accountId", selectedAccountId.toString());

    try {
      const result = await updateAccount(formData);

      if (!result || result.error) {
        toast({
          title: "Gagal",
          description:
            result?.error || "Terjadi kesalahan saat memperbarui akun",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(false);
      toast({
        title: "Berhasil",
        description: "Akun telah diperbarui",
        variant: "default",
      });

      setOpen(false);
      // Call the success callback to refresh the table
      // if (onSuccess) {
      //   onSuccess();
      // }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui Akun",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTransaction(account.id);

      if (!result || result.error) {
        toast({
          title: "Gagal",
          description:
            result?.error || "Terjadi kesalahan saat menghapus Akun",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Akun telah dihapus",
        variant: "default",
      });

      setOpen(false);
      setShowDeleteAlert(false);
      //window.location.reload() // Temporary solution - better to use React state management
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus Akun",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>UBAH AKUN</DialogTitle>
          </DialogHeader>
          {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
          <form action={handleFormAction} className="space-y-4">
            <input type="hidden" name="id" value={account.id} />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-left">
                  Kode
                </Label>
                <Input
                  id="code"
                  name="code"
                  defaultValue={account.code}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Nama
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={account.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance1" className="text-left w-[100%]">
                  Saldo Awal
                </Label>
                <Input
                  id="balance1"
                  name="balance1"
                  defaultValue={balancedefault}
                  className="col-span-3"
                />
              </div>

            </div>
            <div className="flex justify-between space-x-2">
              <Button variant="link" onClick={handleDeleteClick}>
                {<Trash2Icon />}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "SIMPAN PERUBAHAN"}
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
              <br />
              Transaksi ini akan dihapus secara permanen.
              <br />
              Akan berpengaruh pada posisi Saldo Akun.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
