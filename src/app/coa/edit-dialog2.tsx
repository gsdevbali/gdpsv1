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
import { Trash2Icon } from "lucide-react";

import { useRouter } from "next/navigation";
// import { CurrencyInput } from "@/components/currency-input";
import CurrencyInput from "react-currency-input-field";
import { error } from "console";

interface Account {
  id: number;
  code: string;
  name: string;
  balance1: number;
  accountTypeId: number;
  accountGroupId: number;
  accountGroup2Id: number;
}


interface EditDialogProps {
  children: React.ReactNode;
  account: Account;
  onSuccess?: () => void;
}


// export function EditDialog({ children, account }: EditDialogProps) {
export function EditDialog2({ children, account, onSuccess }: EditDialogProps) {
  const router = useRouter();

  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  //const [formData, setFormData] = useState(transaction)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { toast }: any = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState(account.id);
  const balancedefault = 0; // Set default value for balance
  const [balance1, setBalance1] = useState<number>(account.balance1);
  // const [balance1, setBalance1] = useState<string>(account.balance1?.toString() || '0');

  // update balance1 when account changes
  useEffect(() => {
    setBalance1(account.balance1);
  }, [account.balance1]);
  
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
    formData.set("accountId", selectedAccountId.toString());
    const updatedFormData = new FormData();
    // Copy all existing form data
    Array.from(formData.entries()).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });
    // Explicitly set the accountId
    updatedFormData.set("accountId", selectedAccountId.toString());
    // updatedFormData.set("balance1", balance1.replace(/[^\d.-]/g, '')); // Remove currency formatting
 

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
      // router.refresh();
      // Call the success callback to refresh the table
      if (onSuccess) {
        onSuccess();
        // onSuccess(account.id);
      }
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
      // const result = { success: true, error }; // Mock result for testing

      if (!result || result.error) {
        toast({
          title: "Gagal",
          description: result?.error || "Terjadi kesalahan saat menghapus Akun",
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
      console.error("Error deleting Akun:", error);
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
                  type="number"
                  prefix="Rp. "                  
                  // step="0.01"
                  value={balance1}
                  onChange={(e) => setBalance1(Number(e.target.value))}
                  className="col-span-3"
                />

              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance1" className="text-left w-[100%]">
                  Saldo Awal
                </Label>
                <CurrencyInput
                  className="w-full bg-inherit col-span-3 px-3 py-1.5 border border-gray-300 rounded-md"
                  prefix="Rp. "
                  id="balance1"
                  name="balance1"
                  placeholder="Saldo Awal"
                  groupSeparator="."
                  decimalSeparator=","
                  // decimalsLimit={2}
                  // defaultValue={balance1}
                  value={balance1}
                  onChange={(e) => setBalance1(Number(e.target.value))}
                  // onValueChange={(value) => setBalance1(value || '0')}
                  // onValueChange={(value, name, values) => console.log(value, name, values)}
                />

              </div> */}
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
