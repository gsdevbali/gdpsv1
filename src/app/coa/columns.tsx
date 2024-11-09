'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
//import AccountDialog from "./AccountDialog"

export type Account = {
    id: number
    code: string
    name: string
    accountType: { name: string } 
    accountGroup: { name: string } 
    accountGroup2: { name: string } 
    balance: number
}

export const columns: ColumnDef<Account>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },

    {
        accessorKey: "code",
        header: () => <div className="text-left w-[80px]">Kode</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[80px]">{row.original.code}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "name",
        header: () => <div className="text-left w-[100%]">Nama</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">
                <Link
                    href={`/coa/${row.original.id}/transactions`}
                    className="text-blue-600 hover:underline"
                >
                    {row.original.name}
                </Link>
            </div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "accountGroup.name",
        header: "Grup",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountGroup.name}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "accountType.name",
        header: "Tipe",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountType.name}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "accountGroup2.name",
        header: "Grup 2",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountGroup2.name}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "balance",
        header: () => <div className="text-right w-[100%]">Saldo</div>,
        cell: ({ row }) => {
            const balance = row.original.balance;
            const positiveBalance = Math.abs(balance);
            return <div className="text-right w-[100%]">Rp. {positiveBalance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },

]