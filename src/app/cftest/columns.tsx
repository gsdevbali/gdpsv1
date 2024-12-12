'use client'

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
//import AccountDialog from "./AccountDialog"

export type Account = {
    id: number
    code: string
    name: string
    accountType: string
    accountGroup: {
        id: number
        name: string
    }
    accountGroup2: {
        id: number
        name: string
    }
    //accountGroup: string
    //accountGroup2: string
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

    // {
    //     id: "date",
    //     accessorKey: "date",
    //     header: () => <div className="text-left w-[60px]">Tanggal</div>,
    //     cell: ( { row }) => {
    //         return <div className="text-left w-[60px]">{row.original.date}</div>;
    //     },
    //     enableSorting: true
    // },
    {
        accessorKey: "code",
        header: () => <div className="text-left min-w-[60px] max-w-[80px]">Kode</div>,
        cell: ({ row }) => {
            return <div className="text-left min-w-[60px] max-w-[80px]">{row.original.code}</div>;
        },
        enableSorting: true,
    },
    {
        id: "group2",
        accessorKey: "accountGroup2.name",
        header: () => <div className="text-left w-[100px]">Kelompok</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[100px]">{row.original.accountGroup2.name}</div>;
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: "groupname",
        accessorKey: "accountGroup.name",
        header: () => <div className="text-left w-[100px]">Kelompok</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[100px]">{row.original.accountGroup.name}</div>;
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "name",
        header: () => <div className="text-left">Akun</div>,
        cell: ({ row }) => {
            return <div className="text-left">
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
        accessorKey: "balance",
        header: () => <div className="text-right">Saldo</div>,
        cell: ({ row }) => {
            // const balance = row.original.balance;
            const balance = Math.abs(row.original.balance);
            return <div className="text-right">Rp. {balance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },

]