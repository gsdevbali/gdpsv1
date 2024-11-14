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
import { getAccountsByGroup2, getGroup1, getGroup2 } from "@/actions/AccountAction"
import { PaginationInfo } from "@/components/PaginationInfo"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Label } from "@/components/ui/label"



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // dateStart: string
    // dateEnd: string
}

interface Group1 {
    id: number;
    name: string;
}

interface Group2 {
    id: number;
    name: string;
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

    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const [dateStart, setDateStart] = useState(firstDayOfMonth);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        id: false,
        g1id: false,
        g2id: false,
        g2name: false,
        coaid: false,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [totalBalance, setBalance] = useState<number>(0);

    const [subTitle, setSubTitle] = useState<string>('SEMUA');
    const [subTitleAccount, setSubTitleAccount] = useState<string>('SEMUA AKUN');
    const [subTitleGroup, setSubTitleGroup] = useState<string>('SEMUA GROUP');

    const [group1, setGroup1] = useState<Group1[]>([]);
    const [group2, setGroup2] = useState<Group2[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [currentGroup1Id, setCurrentGroup1Id] = useState<number>(0)
    const [currentGroup2Id, setCurrentGroup2Id] = useState<number>(0);
    // Add this helper function before the return statement
    const calculateTotals = (rows: any[]) => {
        const totals = rows.reduce((acc, row) => {
            return {
                debit: acc.debit + (Number(row.original.debit) || 0),
                credit: acc.credit + (Number(row.original.credit) || 0)
            };
        }, { debit: 0, credit: 0 });

        setTotalDebit(totals.debit);
        setTotalCredit(totals.credit);
        setBalance(totals.debit - totals.credit);
    };

    // Fetch data: Group2 & Accounts for Filter Lookup
    useEffect(() => {

        const fetchGroup1 = async () => {
            try {
                const fetchedGroup1 = await getGroup1();
                setGroup1(fetchedGroup1);
            } catch (error) {
                console.error('Failed to fetch data Group1:', error);
            }
        };

        const fetchGroup2 = async () => {
            try {
                const fetchedGroup2 = await getGroup2();
                setGroup2(fetchedGroup2);
            } catch (error) {
                console.error('Failed to fetch data Group2:', error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const fetchedAccounts = await getAccountsByGroup2(currentGroup2Id);
                setAccounts(fetchedAccounts);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchGroup1();
        fetchGroup2();
        fetchAccounts();

    }, [currentGroup1Id, currentGroup2Id]);


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

    const getGroup1Name = (id: string) => {
        if (!id) return 'Semua Grup';
        const selected = group1.find(g => g.id === parseInt(id));
        return selected ? selected.name : 'SEMUA';
    }

    const getGroup2Name = (id: string) => {
        if (!id) return 'Semua Aktivitas';
        const selected = group2.find(g => g.id === parseInt(id));
        return selected ? selected.name : 'SEMUA';
    }

    const getAccountName = (id: string) => {
        const textAll = ' - Semua Akun';
        if (!id) return textAll;
        const selected = accounts.find(a => a.id === parseInt(id));
        return selected ? ' - ' + selected.name : textAll;
    }


    useEffect(() => {
        calculateTotals(table.getFilteredRowModel().rows);
        const g1Id = table.getColumn("g1id")?.getFilterValue() as string;
        const g2Id = table.getColumn("g2id")?.getFilterValue() as string;

        setCurrentGroup1Id(parseInt(g1Id));
        setCurrentGroup2Id(parseInt(g2Id));

        const coaId = table.getColumn("coaid")?.getFilterValue() as string;
        setSubTitle(getGroup2Name(g2Id));
        setSubTitleAccount(getAccountName(coaId));
        setSubTitleGroup(getGroup1Name(g1Id));

        //}, [table, getGroup2Name, getAccountName]);
    }, [table.getFilteredRowModel().rows]);

    return (
        <>
            <div className={printStyles.printContainer}>
                <div>
                    <h1 className="text-3xl font-bold">
                        <span className="font-bold">BUKU BESAR</span>
                        <span className="font-light"> - {subTitle} </span>
                    </h1>
                    <h2>
                        <span className="text-[20px] text-blue-500 font-light">{subTitleGroup} </span>
                        <span className="text-[20px] text-blue-500 font-light">{subTitleAccount} </span>
                    </h2>
                    {/* {isDateFilterActive && (
                        <h2 className="ml-2 text-xl font-normal">
                            ({formatDateRange()})
                        </h2>
                    )} */}
                    <Divider />

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
                    <div className="text-xl">
                        <span className="font-semibold">Total Saldo: </span>

                        <span className="font-bold text-orange-500">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(totalBalance)}
                        </span>
                    </div>
                </div>

                {/* Filter Tanggal */}
                {/* <div className="text-left">
                                        <Label>Mulai dari:</Label>
                                        <Input
                                            type="date"
                                            value={dateStart}
                                            onChange={(e) => setDateStart(e.target.value)}
                                            placeholder="Start Date"
                                            className="w-full"
                                        />
                                        <div className="h-2" />
                                        <Label>Sampai dengan:</Label>
                                        <Input
                                            type="date"
                                            value={dateEnd}
                                            onChange={(e) => setDateEnd(e.target.value)}
                                            placeholder="End Date"
                                        />
                                    </div>
                <div className="flex pt-4 items-center gap-4">
                    <Label>Awal:</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                    {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>

                    <Label>Akhir:</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                    {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div> */}

                {/* End Filter Tgl */}

                <div className={`flex items-center py-4 gap-2 ${styles.noPrint}`}>

                    <select
                        value={(table.getColumn("g2id")?.getFilterValue() as string) ?? ""}
                        name='x'
                        onChange={(e) => {
                            // Find the selected group2 item and use its name instead of ID
                            table.getColumn("g2id")?.setFilterValue(e.target.value)
                            console.log("G2 ID:", e.target.value);
                            setCurrentGroup2Id(parseInt(e.target.value));
                        }
                        }
                        //required
                        className='border p-2 rounded w-[100px] md:w-[30%] h-[40px]'
                    >
                        <option value="">Semua Aktivitas</option>
                        {group2.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.id} - {item.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={(table.getColumn("coaid")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => {
                            table.getColumn("coaid")?.setFilterValue(event.target.value)
                            console.log("COA ID:", event.target.value);
                        }
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

                    {/* Group 1 */}
                    <select
                        value={(table.getColumn("g1id")?.getFilterValue() as string) ?? ""}
                        name='x'
                        onChange={(e) => {
                            // Find the selected group2 item and use its name instead of ID
                            table.getColumn("g1id")?.setFilterValue(e.target.value)
                            console.log("G1 ID:", e.target.value);
                            setCurrentGroup1Id(parseInt(e.target.value));
                        }
                        }
                        //required
                        className='border p-2 rounded w-[100px] md:w-[50%] h-[40px]'
                    >
                        <option value="">Semua Grup</option>
                        {group1.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.id} - {item.name}
                            </option>
                        ))}
                    </select>

                    <Input
                        placeholder="Cari Referensi ...."
                        value={(table.getColumn("ref")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => {
                            table.getColumn("ref")?.setFilterValue(event.target.value)
                        }
                        }
                        className="w-[200px]"
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
                    {/* <div className="flex-1 text-sm text-foreground"> */}
                    {/* {table.getFilteredSelectedRowModel().rows.length} dari{" "} */}
                    {/* <span className="text-sm font-bold">{table.getFilteredRowModel().rows.length}</span> baris data ditemukan. */}
                    {/* </div> */}
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

        </>
    )
}