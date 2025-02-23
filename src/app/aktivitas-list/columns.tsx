'use client'

import { ColumnDef } from "@tanstack/react-table"
import { FilterFn } from "@tanstack/react-table"
//import AccountDialog from "./AccountDialog"
import { tanggal } from '@/lib/tanggal';

import { Checkbox } from "@/components/ui/checkbox";

const group2Filter: FilterFn<Transaction> = (row, columnId, filterValue) => {
    const value = row.getValue(columnId) as number;
    return filterValue.includes(value);
};

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
    // g2id: number
    //accountGroup2Id: number
}

export type Account = {
    id: number
    code: string
    name: string
    accountGroup2: AccountGroup2
}

export type AccountGroup2 = {
    id: number
    name: string
    flag: string
}

// const dateRangeFilter: FilterFn<Transaction> = (row, columnId, filterValue) => {
//     const cellValue = row.getValue(columnId) as Date;
//     const [start, end] = filterValue as [Date, Date];
//     return cellValue >= start && cellValue <= end;
// };

// const dateRangeFilter: FilterFn<Transaction> = (row, columnId, filterValue) => {
//     const cellValue = row.getValue(columnId) as Date;
//     if (!Array.isArray(filterValue) || filterValue.length !== 2) {
//         return true; // If filterValue is not a valid array, don't filter
//     }
//     const [start, end] = filterValue as [Date, Date];
//     return cellValue >= start && cellValue <= end;
// };

const nestedStringFilter: FilterFn<Transaction> = (row, columnId, filterValue) => {
    const rowData = row.original;
    if (!rowData.account?.accountGroup2?.name) return true;

    const value = rowData.account.accountGroup2.name;
    if (!filterValue || !value) return true;

    return value.toLowerCase().includes(String(filterValue).toLowerCase());
};


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


    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <div className="text-left">{row.original.id}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        enableColumnFilter: false,
    },

    {
        accessorKey: "ref",
        header: "Referensi",
        cell: ({ row }) => {
            return <div className="text-left">{row.original.ref}</div>;
        },
        enableSorting: true,
    },


    {
        id: "g2id",
        accessorKey: "account.accountGroup2.id",
        header: "x",
        cell: ({ row }) => {
            return <div className="text-left">{row.original.account.accountGroup2.id}</div>;
        },
        filterFn: "equalsString",
        enableHiding: true,
        enableColumnFilter: false,

    },

    {
        id: "g2name",
        accessorFn: (row) => row.account.accountGroup2.name,
        header: "G2name",
        cell: ({ row }) => {
            return <div className="text-left">{row.original.account.accountGroup2.name}</div>;
        },
        enableHiding: true,
        enableColumnFilter: false,
        //filterFn: "contains"
    },

    {
        accessorKey: "coa",
        header: "Kode",
        cell: ({ row }) => {
            return <div className="text-left">{row.original.account.code}</div>;
        },
        enableSorting: true,
    },

    {
        id: "coaid",
        accessorKey: "accountId",
        header: "Kode",
        cell: ({ row }) => {
            return <div className="text-left">{row.original.accountId}</div>;
        },        
        filterFn: "equalsString",
        enableSorting: true,
        enableHiding: true,
    },

    {
        accessorKey: "date",
        header: "Tanggal",
        cell: ({ row }) => {
            const newDate = tanggal(row.original.date)
            return <div className="text-left">{newDate}</div>;
        },
        enableSorting: true,
    },

    {
        accessorKey: "description",
        header: "Uraian",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.description}</div>;
        },
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
        enableSorting: true,
    },


]