'use client'

import { ColumnDef } from "@tanstack/react-table"
import { FilterFn } from "@tanstack/react-table"
//import AccountDialog from "./AccountDialog"
import { tanggal } from '@/lib/tanggal';
import Link from "next/link";

import { EditDialog } from "./edit-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
//import { Account } from "@prisma/client";

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
    account: Account
}

export type Account = {
    id: number
    code: string
    name: string
}

// const dateRangeFilter: FilterFn<Transaction> = (row, columnId, filterValue) => {
//     const cellValue = row.getValue(columnId) as Date;
//     const [start, end] = filterValue as [Date, Date];
//     return cellValue >= start && cellValue <= end;
// };

const dateRangeFilter: FilterFn<Transaction> = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId) as Date;
    if (!Array.isArray(filterValue) || filterValue.length !== 2) {
        return true; // If filterValue is not a valid array, don't filter
    }
    const [start, end] = filterValue as [Date, Date];
    return cellValue >= start && cellValue <= end;
};


export const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // {
    //     id: "date",
    //     accessorKey: "date",
    //     header: "Date",
    //     filterFn: dateRangeFilter
    // },

    // {
    //     //id: "id",
    //     accessorKey: "id",
    //     header: "ID",
    //     enableSorting: true,
    // },

    {
        accessorKey: "date",
        header: "Tanggal",
        cell: ({ row }) => {
            const newDate = tanggal(row.original.date)
            return <div className="text-left w-[80px]">{newDate}</div>;
        },
        filterFn: dateRangeFilter,
        enableSorting: true,
    },

    // {
    //     id: "account.code",  // unique identifier for the column
    //     header: "COA",
    //     accessorFn: (row) => row.account.code,  // explicitly define how to access the data
    //     cell: ({ row }) => row.original.account.code,
    //     filterFn: "includesString",
    // },

    {
        id: "accountId",
        accessorKey: "accountId",
        //accessorKey: "account.code",
        //accessorFn: (row) => row.account.code,
        header: "Akun",
        cell: ({ row }) => {
            return <div className="text-left w-[80px]">
                {/* {row.original.account.code} */}
                <Link
                    href={`/coa/${row.original.accountId}/transactions`}
                    className="text-blue-600 hover:underline"
                >
                    {row.original.account.code}
                </Link>
            </div>;
        },
        enableSorting: true,
        
    },

    {
        accessorKey: "accountId",
        header: "COA",
        cell: ({ row }) => {
            return <div className="text-left w-[100px]">

                {row.original.accountId}

            </div>;
        },
        enableSorting: true,
        filterFn: "equalsString",
        enableHiding: true,

    },

    {
        accessorKey: "ref",
        header: "Referensi",
        cell: ({ row }) => {
            return <div className="text-left w-[100px]">

                {row.original.ref}

            </div>;
        },
        enableSorting: true,

    },

    {
        accessorKey: "description",
        header: () => <div className="text-left w-[100%] min-w-[130px]">URAIAN</div>,
        cell: ({ row }) => {
            return <div className="text-left w-[100%] min-w-[130px]">
                <EditDialog transaction={row.original}>
                    <Button variant="link" size="sm">
                        {row.original.description}
                    </Button>
                </EditDialog>
            </div>;
        },
        enableSorting: true,
    },


    {
        accessorKey: "debit",
        header: () => <div className="text-right w-[160px]">DEBET</div>,
        cell: ({ row }) => {
            const newDebit = Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(row.original.debit)
            return <div className="text-right w-[160px]">{newDebit}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "credit",
        header: () => <div className="text-right w-[200px]">KREDIT</div>,
        cell: ({ row }) => {
            const newCredit = Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(row.original.credit)
            return <div className="text-right w-[200px]">{newCredit}</div>;
        },
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <EditDialog transaction={row.original}>
                        <Button variant="ghost" size="sm">
                            Edit
                        </Button>
                    </EditDialog>
                </div>
            )
        },
    },

]