import { ColumnDef } from "@tanstack/react-table"

// Define the types for our data structure
//interface Account {
export type Account = {
    //GroupedAccount
    id: number
    code: string
    name: string
    balance: number
    // ... other account properties

    accountType: string
    accountGroup: {
        id: number
        name: string
    }
    accountGroup2: {
        id: number
        name: string
    }
}

//export type GroupedAccount {
export type GroupedAccount = {
    groupName: string
    accounts: Account[]
    subtotal: number
}

export const columns: ColumnDef<GroupedAccount>[] = [
    {
        accessorKey: "groupName",
        header: "Account Group",
        cell: ({ row }) => {
            return (
                <div className="font-bold">
                    {row.original.groupName}
                </div>
            )
        }
    },
    {
        id: "accounts",
        header: "Accounts",
        cell: ({ row }) => {
            return (
                <div className="space-y-1">
                    {row.original.accounts.map((account) => (
                        <div key={account.id} className="flex justify-between">
                            <span>{account.code} - {account.name}</span>
                            <span className="text-right">
                                {new Intl.NumberFormat('id-ID').format(account.balance)}
                            </span>
                        </div>
                    ))}
                    <div className="border-t pt-1 font-bold flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-right">
                            {new Intl.NumberFormat('id-ID').format(row.original.subtotal)}
                        </span>
                    </div>
                </div>
            )
        }
    },
]