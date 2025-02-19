'use client'

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
// import TransByCoaId from "./trans-by-coa"
//import AccountDialog from "./AccountDialog"

export type Account = {
    id: number
    code: string
    name: string
    debit: number
    credit: number
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
    // 

    // {
    //     id: "group2",
    //     accessorKey: "accountGroup2.name",
    //     header: () => <div className="text-left">Kelompok</div>,
    //     cell: ({ row }) => {
    //         return <div className="text-left">{row.original.accountGroup2.name}</div>;
    //     },
    //     enableSorting: true,
    //     enableHiding: true,
    // },

    // {
    //     accessorKey: "accountGroup.name",
    //     header: () => <div className="text-left w-[100px]">Kelompok</div>,
    //     cell: ({ row }) => {
    //         return <div className="text-left w-[100px]">{row.original.accountGroup.name}</div>;
    //     },
    //     enableSorting: true,
    // },

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

    // {
    //     accessorKey: "name",
    //     header: () => <div className="text-left">Akun</div>,
    //     cell: ({ row }) => {
    //         return (
    //             <Link
    //                 href={`/coa/${row.original.id}/transactions`}
    //                 onClick={(e) => {
    //                     e.preventDefault(); // Prevent default link behavior
    //                     TransByCoaId({ params: { accountId: row.original.id, code: row.original.code, name: row.original.name } });
    //                 }}
    //                 className="text-blue-600 hover:underline"
    //             >
    //                 {row.original.name}
    //             </Link>
    //         );
    //     },
    //     enableSorting: true,
    // },

    // {
    //     accessorKey: "debit",
    //     header: () => <div className="text-right">Debet</div>,
    //     cell: ({ row }) => {
    //         //const balance = row.original.balance;
    //         const value = Math.abs(row.original.debit);
    //         return <div className="text-right">Rp. {value.toLocaleString()}</div>;
    //     },
    //     enableSorting: true,
    // },

    // {
    //     accessorKey: "credit",
    //     header: () => <div className="text-right">Kredit</div>,
    //     cell: ({ row }) => {
    //         //const balance = row.original.balance;
    //         const value = Math.abs(row.original.credit);
    //         return <div className="text-right">Rp. {value.toLocaleString()}</div>;
    //     },
    //     enableSorting: true,
    // },

    {
        accessorKey: "balance",
        header: () => <div className="text-right">Saldo</div>,
        cell: ({ row }) => {
            //const balance = row.original.balance;
            const balance = Math.abs(row.original.balance);
            return <div className="text-right">Rp. {balance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },

    // {
    //     accessorKey: "btn1",
    //     cell: ({ row }) => {
    //         return <div className="text-left">
    //             <Link
    //                 href={`/coa/${row.original.id}/transactions`}
    //                 className="text-blue-600 hover:underline"
    //             >
    //                 test
    //             </Link>
    //         </div>;
    //     },

    // }

]