'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
//import AccountDialog from "./AccountDialog"

export type Account = {
    id: number
    accountCount: number
    balance: number
    accounts: Account[]
}

export const columns: ColumnDef<Account>[] = [

    {
        accessorKey: "accounts.name",
        header: "Akun",
    },
    {
        accessorKey: "accountCount",
        header: () => <div className="text-left w-[60px]">Jumlah Akun</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[60px]">{row.original.accountCount}</div>;
        },
        enableSorting: true,
    },

    {
        accessorKey: "balance",
        header: () => <div className="text-right">Saldo</div>,
        cell: ({ row }) => {
            return <div className="text-right">Rp. {row.original.balance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },



]