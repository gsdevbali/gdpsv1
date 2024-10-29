"use client"

import React from "react"
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
import PrintButton from "@/components/PrintButton"

import styles from './DataTable.module.css';
import printStyles from './PrintStyles.module.css';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // dateStart: string
    // dateEnd: string
}

export function DataTable<TData, TValue>({
    columns,
    data,

}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    // Add a new state variable to track whether the date filter is active
    //const [isDateFilterActive] = React.useState(false)


    // Add these new state variables
    // const [dateStart, setDateStart] = React.useState<string>(initialDateStart)
    // const [dateEnd, setDateEnd] = React.useState<string>(initialDateEnd)

    // Modify these state variables to use the current year as default
    // const [dateStart, setDateStart] = React.useState<string>(() => {
    //     return format(startOfYear(new Date()), "yyyy-MM-dd")
    // })
    // const [dateEnd, setDateEnd] = React.useState<string>(() => {
    //     return format(endOfYear(new Date()), "yyyy-MM-dd")
    // })

    // Add this new function to format the date range for the title
    // const formatDateRange = () => {
    //     if (isDateFilterActive) {
    //         const startFormatted = format(parseISO(dateStart), "d MMMM yyyy")
    //         const endFormatted = format(parseISO(dateEnd), "d MMMM yyyy")
    //         return `${startFormatted} - ${endFormatted}`
    //     }
    //     return "Semua"
    // }

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

    // Add this effect to update the date filter when dateStart or dateEnd changes
    // React.useEffect(() => {
    //     table.getColumn('date')?.setFilterValue([dateStart, dateEnd])
    // }, [dateStart, dateEnd])

    // Modify the useEffect to only apply the filter when isDateFilterActive is true
    // React.useEffect(() => {
    //     if (isDateFilterActive) {
    //         table.getColumn('date')?.setFilterValue([dateStart, dateEnd])
    //     } else {
    //         table.getColumn('date')?.setFilterValue(null)
    //     }
    // }, [dateStart, dateEnd, isDateFilterActive])

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
                    <Divider />
                    {/* <PrintButton /> */}

                </div>
                <div className={`flex items-center py-4 gap-2 ${styles.noPrint}`}>

                    {/* <Input
                    type="date"
                    value={dateStart}
                    onChange={(e) => {
                        setDateStart(e.target.value)
                        if (isDateFilterActive) {
                            table.getColumn('date')?.setFilterValue([e.target.value, dateEnd])
                        }
                    }}
                    placeholder="Start Date"
                />
                <Input
                    type="date"
                    value={dateEnd}
                    onChange={(e) => {
                        setDateEnd(e.target.value)
                        if (isDateFilterActive) {
                            table.getColumn('date')?.setFilterValue([dateStart, e.target.value])
                        }
                    }}
                    placeholder="End Date"
                />
                <Button
                    onClick={() => setIsDateFilterActive(!isDateFilterActive)}
                    variant={isDateFilterActive ? "default" : "outline"}
                >
                    {isDateFilterActive ? "Clear Date Filter" : "Apply Date Filter"}
                </Button>
                 */}

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
                        <div className="flex-1 text-sm text-muted-foreground">
                            {/* {table.getFilteredSelectedRowModel().rows.length} dari{" "} */}
                            {table.getFilteredRowModel().rows.length} baris data ditemukan.
                        </div>
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