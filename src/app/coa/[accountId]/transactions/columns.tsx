'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
//import AccountDialog from "./AccountDialog"
import { tanggal } from '@/lib/tanggal';

export type Transaction = {
    id: number
    date: Date
    description: string
    ref: string
    mediaPath: string
    debit: number
    credit: number
    accountId: number
    createdAt: Date
    updatedAt: Date
    flag: string
}

export const columns: ColumnDef<Transaction>[] = [
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
    //     accessorKey: "account.code",
    //     header: "Akun",
    //     enableColumnFilter: true,
    //     enableSorting: true,
    // },

    {
        accessorKey: "ref",
        header: "Nom. Ref.",
        enableColumnFilter: true,
        enableSorting: true,
    },

    {
        accessorKey: "date",
        header: "Tanggal",
        cell: ({ row }) => {
            const newDate = tanggal(row.original.date)
            return <div className="text-left w-[100px]">{newDate}</div>;
        },
        enableColumnFilter: true,
        enableSorting: true,
    },



    {
        accessorKey: "description",
        header: () => <div className="text-left w-[100%]">URAIAN</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.description}</div>;
        },
        enableColumnFilter: true,
        enableSorting: true,
    },

    {
        accessorKey: "debit",
        header: () => <div className="text-right w-[100%]">DEBET</div>,
        cell: ({ row }) => {
            const newDebit = Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(row.original.debit)
            return <div className="text-right w-[100%]">{newDebit}</div>;
        },
        enableColumnFilter: true,
        enableSorting: true,
    },
    {
        accessorKey: "credit",
        header: () => <div className="text-right w-[100%]">KREDIT</div>,
        cell: ({ row }) => {
            const newCredit = Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(row.original.credit)
            return <div className="text-right w-[100%]">{newCredit}</div>;
        },
        enableColumnFilter: true,
        enableSorting: true,
    },

]