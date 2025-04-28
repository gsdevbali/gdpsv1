'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
//import { EditDialog } from "./edit-dialog"
import { Button } from "@/components/ui/button"
import { EditDialog } from "./edit-dialog"
import { PencilIcon } from "lucide-react";
//import AccountDialog from "./AccountDialog"

// export type Account = {
//     id: number
//     code: string
//     name: string
//     accountType: { name: string, id: string  } 
//     accountGroup: { name: string, id: string } 
//     accountGroup2: { name: string, id: string } 
//     balance: number
// }

export type Account = {
    id: number
    code: string
    name: string
    accountType: { 
        id: string
        name: string 
    }
    accountGroup: { 
        id: string
        name: string 
    }
    accountGroup2: { 
        id: string
        name: string 
    }
    accountTypeId: number
    accountGroupId: number
    accountGroup2Id: number
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
        id: "idcoa",
        accessorKey: "accountId",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.id}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "code",
        header: () => <div className="text-left">Kode</div>,
        cell: ({ row }) => {
            return <div className="text-left">
                {row.original.code}
                {/* <EditDialog transaction={row.original}>
                    <Button variant="custom1" size="custom1">
                        {row.original.code}
                    </Button>
                </EditDialog> */}
            </div>;
        },
        enableSorting: true,
        filterFn: "includesString",
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
        id: "codeAccountGroup",
        accessorKey: "accountGroup.code",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.accountGroup.id}</div>;
        },
        enableSorting: true,
    },
    {
        id: "accountGroup",
        accessorKey: "accountGroup.name",
        header: "Grup",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountGroup.name}</div>;
        },
        enableSorting: true,
    },
    {
        id: "codeAccountGroup2",
        accessorKey: "accountGroup2.code",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.accountGroup2.id}</div>;
        },
        enableSorting: true,
    },
    {
        id: "accountGroup2",
        accessorKey: "accountGroup2.name",
        header: "Grup 2",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountGroup2.name}</div>;
        },
        enableSorting: true,
    },
    {
        id: "codeAccountType",
        accessorKey: "accountType.id",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.accountType.id}</div>;
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
        accessorKey: "balance",
        header: () => <div className="text-right w-[100%]">Saldo</div>,
        cell: ({ row }) => {
            const balance = row.original.balance;
            const positiveBalance = Math.abs(balance);
            return <div className="text-right w-[100%]">Rp. {positiveBalance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },
    {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="text-right">
                        <EditDialog account={row.original}>
                            <Button variant="ghost" size="icon">
                                <PencilIcon />
                            </Button>
                        </EditDialog>
                    </div>
                )
            },
        },

]