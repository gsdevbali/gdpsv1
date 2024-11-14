"use client"

import React, { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// Add this new import for date handling
import { parseISO, startOfYear, endOfYear } from "date-fns"
import Divider from "@/components/Divider"

import styles from './DataTable.module.css';
import printStyles from './PrintStyles.module.css';
import { getAccounts } from "@/actions/AccountAction"
import { PaginationInfo } from "@/components/PaginationInfo"
import { Label } from "@/components/ui/label"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // dateStart: string
    // dateEnd: string
}


interface Account {
    id: number;
    code: string;
    name: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,

}: DataTableProps<TData, TValue>) {

    const [newPeriod, setNewPeriod] = useState(true);

    const [dateStart, setDateStart] = useState(new Date().toISOString().split('T')[0]);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        accountId: false,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);

    const [accounts, setAccounts] = useState<Account[]>([]);


    // Hitung Total Debit dan Kredit
    const calculateTotals = (rows: any[]) => {
        const totals = rows.reduce((acc, row) => {
            return {
                debit: acc.debit + (Number(row.original.debit) || 0),
                credit: acc.credit + (Number(row.original.credit) || 0)
            };
        }, { debit: 0, credit: 0 });

        setTotalDebit(totals.debit);
        setTotalCredit(totals.credit);
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const fetchedAccounts = await getAccounts();
                setAccounts(fetchedAccounts);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),

        filterFns: {
            dateRange: (row, columnId, filterValue) => {
                const cellValue = row.getValue(columnId) as string
                const [start, end] = filterValue as [string, string]

                if (!start && !end) return true
                if (!cellValue) return false

                const date = parseISO(cellValue)
                const startDate = start ? parseISO(start) : startOfYear(new Date())
                const endDate = end ? parseISO(end) : endOfYear(new Date())

                return date >= startDate && date <= endDate
            },
        },

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })


    // Hitung Total Debit dan Kredit di Awal
    useEffect(() => {
        calculateTotals(table.getFilteredRowModel().rows);
        //const g2Id = table.getColumn("g2id")?.getFilterValue() as string;
        //setSubTitle(getGroup2Name(g2Id));
    }, [table.getFilteredRowModel().rows]);


    const getDateRange = () => {
        if (newPeriod) return 'Semua Tanggal';
        //setNewPeriod(false);
        const start = new Date(dateStart);
        const end = new Date(dateEnd);

        const startDateLong = start.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        const endDateLong = end.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        //return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        return `${startDateLong} - ${endDateLong}`;

    }

    const handleResetDate = () => {
        setDateStart(new Date().toISOString().split('T')[0]);
        setDateEnd(new Date().toISOString().split('T')[0]);
        table.getColumn("date")?.setFilterValue(["2020-01-01", new Date().toISOString().split('T')[0]]);
        setNewPeriod(true);
    }

    return (
        <>
            <div className={printStyles.printContainer}>
                <div>
                    <h1 className="text-3xl font-bold">TRANSAKSI
                    </h1>
                    {/* {isDateFilterActive && (
                        <h2 className="ml-2 text-xl font-normal">
                            ({formatDateRange()})
                        </h2>
                    )} */}
                    <div>

                        <span className="text-[18px] text-orange-500 font-light">
                            {getDateRange()}
                        </span>

                    </div>
                    <Divider />
                    {/* <PrintButton /> */}

                </div>

                {/* TOTAL  */}
                <div className="ml-auto flex gap-4 mr-4">
                    <div className="text-xl">
                        <span className="font-semibold">Total Debit: </span>

                        <span className="font-bold text-orange-500">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(totalDebit)}
                        </span>

                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Total Kredit: </span>

                        <span className="font-bold text-orange-500">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(totalCredit)}
                        </span>

                    </div>
                </div>

                {/* Filter Tanggal */}
                <div className="flex-row pt-4 items-center gap-4">
                    <Label className="w-[200px]">Mulai dari:</Label>
                    <Input
                        className="w-[300px]"
                        name="d1"
                        type="date"
                        //value={dateStart}
                        // onChange={(e) => setDateStart(e.target.value)}
                        onChange={(e) => {
                            // Find the selected group2 item and use its name instead of ID
                            setNewPeriod(false);
                            setDateStart(e.target.value);
                            //const start) = e.target.value;
                            //const end = new Date();
                            table.getColumn("date")?.setFilterValue([e.target.value, dateEnd]);
                            console.log("date start:", e.target.value);
                            //setCurrentGroup2Id(parseInt(e.target.value));
                        }
                        }
                        placeholder="Start Date"

                    />

                    <Label className="w-[200px]">Sampai dengan:</Label>
                    <Input
                        className="w-[300px]"
                        name="d2"
                        type="date"
                        //value={dateEnd}
                        onChange={(e) => {
                            // Find the selected group2 item and use its name instead of ID
                            setNewPeriod(false);
                            setDateEnd(e.target.value);

                            table.getColumn("date")?.setFilterValue([dateStart, e.target.value]);
                            console.log("date end:", e.target.value);
                            //setCurrentGroup2Id(parseInt(e.target.value));
                        }
                        }
                        placeholder="End Date"

                    />

                    <Button onClick={handleResetDate} variant={'ghost'}>RESET</Button>
                </div>

                <div className={`flex items-center py-4 gap-2 ${styles.noPrint}`}>

                    <select
                        //value={transaction.accountId}
                        //value={(table.getColumn("accountId")?.getFilterValue() as string) ?? ""}
                        name='accountId'
                        value={(table.getColumn("accountId")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("accountId")?.setFilterValue(event.target.value)
                        }
                        required
                        className='border p-2 rounded w-[100px] md:w-[50%] h-[40px]'
                    >
                        <option value="">Semua Akun</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.code} - {account.name}
                            </option>
                        ))}
                    </select>

                    {/* <Input
                        placeholder="Akun ...."
                        value={(table.getColumn("accountId")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("accountId")?.setFilterValue(event.target.value)
                        }
                        className="w-[100px]"
                    /> */}

                    <Input
                        placeholder="Cari Referensi ...."
                        value={(table.getColumn("ref")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("ref")?.setFilterValue(event.target.value)
                        }
                        className="w-[200px]"
                    />
                    <Input
                        placeholder="Cari Uraian ...."
                        value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("description")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="text-center text-sm font-black">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        className="text-center"
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Tidak ada data.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>


                {/* Pagination */}
                <div className={printStyles.printHide}>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <PaginationInfo totalRows={table.getFilteredRowModel().rows.length} />
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ArrowRight className="mr-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}