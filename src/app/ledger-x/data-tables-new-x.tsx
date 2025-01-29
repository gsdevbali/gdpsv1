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

//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Label } from "@/components/ui/label"
import { get } from "http"



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    dataX: TData[]
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
    dataX,

}: DataTableProps<TData, TValue>) {

    //const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    //const [dateStart, setDateStart] = useState(firstDayOfMonth);
    //const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);

    const [newPeriod, setNewPeriod] = useState(true);

    const [dateStart, setDateStart] = useState(new Date().toISOString().split('T')[0]);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [dateEndPrevious, setDateEndPrevious] = useState('');

    //const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    //const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

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
    //BalanceX -> Saldo Periode yg lalu
    // const [totalDebitX, setTotalDebitX] = useState<number>(0);
    // const [totalCreditX, setTotalCreditX] = useState<number>(0);
    // const [totalBalanceX, setBalanceX] = useState<number>(0);

    const [subTitle, setSubTitle] = useState<string>('SEMUA');
    const [subTitleAccount, setSubTitleAccount] = useState<string>('SEMUA AKUN');
    const [subTitleGroup, setSubTitleGroup] = useState<string>('SEMUA GROUP');
    const [subTitleDateStart, setSubTitleDateStart] = useState<string>('');
    const [subTitleDateEnd, setSubTitleDateEnd] = useState<string>('');

    const [group1, setGroup1] = useState<Group1[]>([]);
    const [group2, setGroup2] = useState<Group2[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [currentGroup1Id, setCurrentGroup1Id] = useState<number>(0)
    const [currentGroup2Id, setCurrentGroup2Id] = useState<number>(0);
    // Add this helper function before the return statement

    const [previousPeriodBalance, setPreviousPeriodBalance] = useState<number>(0);
    const [previousPeriodDebit, setPreviousPeriodDebit] = useState<number>(0);
    const [previousPeriodCredit, setPreviousPeriodCredit] = useState<number>(0);

    const xNumber = dataX;

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
                const cellValue = row.getValue(columnId) as string;
                const [start, end] = filterValue as [string, string];

                if (!start && !end) return true;
                if (!cellValue) return false;

                const date = new Date(cellValue);
                const startDate = start ? new Date(start) : startOfYear(new Date());
                const endDate = end ? new Date(end) : endOfYear(new Date());

                // Normalize times for comparison
                date.setHours(0, 0, 0, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);

                return date >= startDate && date <= endDate;
            },
        },

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    })

    // NEW calculateTotals
    // Modify calculateTotals to handle different periods
    const calculateTotals = (rows: any[], isPreviousPeriod: boolean = false) => {

        // Define fixed start date for previous period calculations
        const FIXED_START_DATE = new Date('2020-01-01');

        // Important: We need to work with the raw data for previous period
        // instead of filtered rows
        const rowsToProcess = isPreviousPeriod ? data : rows;

        const totals = rows.reduce((acc, row) => {
            // Get the date from either row.original (filtered) or row (raw data)
            const rowData = row.original || row;
            const rowDate = new Date(rowData.date);
            const currentPeriodStart = new Date(dateStart);
            const currentPeriodEnd = new Date(dateEnd);

            // Normalize all dates to start of day
            rowDate.setHours(0, 0, 0, 0);
            currentPeriodStart.setHours(0, 0, 0, 0);
            currentPeriodEnd.setHours(23, 59, 59, 999);
            FIXED_START_DATE.setHours(0, 0, 0, 0);

            // For previous period, include only rows before start date
            if (isPreviousPeriod) {
                // For previous period: include rows from FIXED_START_DATE up to day before currentPeriodStart
                if (rowDate < FIXED_START_DATE || rowDate >= currentPeriodStart) {
                    return acc;
                }
            } else {
                // For current period: include only rows between start and end dates
                if (rowDate < currentPeriodStart || rowDate > currentPeriodEnd) {
                    return acc;
                }
            }

            // Add debugging logs
            console.log(`Processing row for ${isPreviousPeriod ? 'previous' : 'current'} period:`, {
                // date: rowDate.toISOString(),
                debit: row.debit,
                credit: row.credit,
                included: isPreviousPeriod ?
                    (rowDate >= FIXED_START_DATE && rowDate < currentPeriodStart) :
                    (rowDate >= currentPeriodStart && rowDate <= currentPeriodEnd)
            });

            return {
                debit: acc.debit + (Number(row.debit) || 0),
                credit: acc.credit + (Number(row.credit) || 0)
            };
        }, { debit: 0, credit: 0 });


        // Add debugging logs for totals
        console.log(`${isPreviousPeriod ? 'Previous' : 'Current'} period totals:`, {
            debit: totals.debit,
            credit: totals.credit,
            balance: totals.debit - totals.credit,
            periodType: isPreviousPeriod ? 'Previous' : 'Current',
            dateRange: isPreviousPeriod ?
                `2020-01-01 to ${new Date(dateStart).toISOString().split('T')[0]}` :
                `${dateStart} to ${dateEnd}`
        });

        if (isPreviousPeriod) {
            setPreviousPeriodDebit(totals.debit);
            setPreviousPeriodCredit(totals.credit);
            setPreviousPeriodBalance(totals.debit - totals.credit);
        } else {
            setTotalDebit(totals.debit);
            setTotalCredit(totals.credit);
            setBalance(totals.debit - totals.credit);
        }
    };


    // const calculateTotalsX = (rows: any[]) => {
    //     const totals = rows.reduce((acc, row) => {
    //         return {
    //             debit: acc.debit + (Number(row.original.debit) || 0),
    //             credit: acc.credit + (Number(row.original.credit) || 0)
    //         };
    //     }, { debit: 0, credit: 0 });

    //     setTotalDebitX(totals.debit);
    //     setTotalCreditX(totals.credit);
    //     setBalanceX(totals.debit - totals.credit);

    // };

    // Fetch data: Group2 & Accounts for Filter Lookup
    useEffect(() => {
        const rows = table.getFilteredRowModel().rows;

        // Log the current filter state
        console.log('Current filters:', {
            dateStart,
            dateEnd,
            rowCount: rows.length,
            filters: table.getState().columnFilters
        });

        // Recalculate totals for the current period using filtered rows
        calculateTotals(rows, false);

        // Recalculate totals for the previous period using raw data
        calculateTotals(data, true);

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

        //const today = new Date().toISOString().split('T')[0];
        //const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

        //setDateStart(firstDayOfMonth);
        //setDateEnd(today);


    }, [
        // currentGroup1Id,
        // currentGroup2Id,
        dateStart,
        dateEnd,
        data, // Add dependency on raw data
        table.getFilteredRowModel().rows,
        table.getState().columnFilters
    ]);

    useEffect(() => {
        calculateTotals(table.getFilteredRowModel().rows);
        // calculateTotalsX(table.getFilteredRowModel().rows);
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
                    <h1 className="text-3xl font-bold">
                        <span className="font-bold">BUKU BESAR X</span>
                        <span className="font-light"> - {subTitle} </span>
                    </h1>
                    <h2>
                        <span className="text-[20px] text-blue-500 font-light">{subTitleGroup} </span>
                        <span className="text-[20px] text-blue-500 font-light">{subTitleAccount} </span>
                    </h2>
                    <div>

                        <span className="text-[18px] text-orange-500 font-light">
                            {getDateRange()}
                        </span>

                    </div>

                    <Divider />
                    <div className="text-sm text-gray-500">
                        <div>Debug Info:</div>
                        <div>Start Date: {dateStart}</div>
                        <div>End Date: {dateEnd}</div>
                        <div>End Date: {dateEndPrevious}</div>
                        <div>Total Rows: {table.getFilteredRowModel().rows.length}</div>
                        <div>Total Raw Data Rows: {data.length}</div>
                        <div>Current Period Debit: {totalDebit}</div>
                        <div>Current Period Credit: {totalCredit}</div>
                        <div>Current Period Balance: {totalBalance}</div>
                        <div>Previous Period Debit: {previousPeriodDebit}</div>
                        <div>Previous Period Credit: {previousPeriodCredit}</div>
                        <div>Previous Period Balance: {previousPeriodBalance}</div>
                    </div>

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

                    <div className="text-xl">
                        <span className="font-semibold">Total Saldo Sebelumnya: </span>

                        <span className="font-bold text-orange-500">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                                // }).format(totalBalanceX)}
                            }).format(previousPeriodBalance)}
                        </span>
                    </div>

                    {/* Add previous period balance display */}
                    {/* <div className="ml-auto flex gap-4 mr-4">
                 <div className="text-xl">
                    <span className="font-semibold">Saldo Periode Sebelumnya: </span>
                    <span className="font-bold text-blue-500">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(previousPeriodBalance)}
                    </span>
                      </div> */}
                    {/* ... existing total displays ... */}

                    {/* </div> */}
                </div>

                {/* Filter Tanggal */}
                <div className="flex justify-start pt-4 items-center gap-4">
                    <Label>Mulai dari:</Label>
                    <Input
                        className="w-[200px]"
                        name="d1"
                        type="date"
                        //value={dateStart}
                        // onChange={(e) => setDateStart(e.target.value)}
                        onChange={(e) => {
                            setNewPeriod(false);

                            //Upodate Date for End of Previous Period
                            // const dateX = new Date(e.target.value);
                            // dateX.setDate(dateX.getDate() - 1);
                            // setDateEndPrevious(dateX.toISOString().split('T')[0]);

                            setDateStart(e.target.value);
                            table.getColumn("date")?.setFilterValue([e.target.value, dateEnd]);
                            console.log("date start:", e.target.value);
                        }
                        }
                        placeholder="Start Date"

                    />

                    <Label>Sampai dengan:</Label>
                    <Input
                        className="w-[200px]"
                        name="d2"
                        type="date"
                        //value={dateEnd}
                        onChange={(e) => {
                            setNewPeriod(false);

                            setDateEnd(e.target.value);

                            const newEnd = new Date(e.target.value);
                            newEnd.setDate(newEnd.getDate() + 1);

                            //table.getColumn("date")?.setFilterValue([dateStart, e.target.value]);
                            table.getColumn("date")?.setFilterValue([dateStart, newEnd.toISOString().split('T')[0]]);
                            console.log("date end:", e.target.value);
                            //setCurrentGroup2Id(parseInt(e.target.value));
                        }
                        }
                        placeholder="End Date"

                    />

                    <Button onClick={handleResetDate} variant={'ghost'}>RESET</Button>
                </div>

                {/* <div className="flex pt-4 items-center gap-4">
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
                                {item.name}
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