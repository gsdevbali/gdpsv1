"use client"
import { DataTable } from "./data-tables";
import { columns } from "./columns";
import { useState } from "react";

import PageLayout from "@/components/PageLayout";
import global from "@/config.js";
//import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// async function getData() {
//     const res = await fetch(`${global.baseUrl}/api/transaction-all`)
//     const data = await res.json()
//     //console.log(data)
//     return data
// }
// 

export default function Page() {
    // const data = await getData()
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    //const today = new Date().toISOString().split('T')[0];

    const [data, setData] = useState(null);
    //const [dateStart, setDateStart] = useState(new Date().toISOString().split('T')[0]);
    const [dateStart, setDateStart] = useState(firstDayOfMonth);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    // for monthly option
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [filterType, setFilterType] = useState("date"); // "date" or "month"

    // fetch data, source: /api/transaction-q
    const fetchData = async (start: string, end: string) => {
        const res = await fetch(`${global.baseUrl}/api/transaction-q?startDate=${start}&endDate=${end}`, {
            cache: 'no-store'
        });
        const fetchedData = await res.json();
        setData(fetchedData);
    };

    const handleDateSubmit = async () => {
        if (dateStart && dateEnd) {
            // const fetchedData = await getData();
            // setData(fetchedData);
            console.log('DATES')
            console.log('Start:', dateStart)
            console.log('End:', dateEnd)
            fetchData(dateStart, dateEnd);
            setIsDialogOpen(false);
        }
    };

    const handleMonthYearSubmit = () => {
        const year = parseInt(selectedYear);
        const month = parseInt(selectedMonth);
        const start = new Date(year, month, 1).toISOString().split('T')[0];
        const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
        console.log('MONTHLY')
        console.log('Start:', start)
        console.log('End:', end)
        fetchData(start, end);
        setIsDialogOpen(false);
    };

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (

        <PageLayout header={header} footer={footer}>
            <div className="w-full">
                {/* <Divider /> */}
                {/* <AccountDialog mode="create">
                    <Button>Add New Account</Button>
                </AccountDialog> */}
                {/* <Button>Add New Account</Button> */}
                {/* <h1 className="text-3xl font-bold">TRANSAKSI</h1>
                <Divider />
                <PrintButton /> */}
                {/* <DataTable columns={columns} data={data} dateStart={dateStart} dateEnd={dateEnd} /> */}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="w-[360px]">
                        <DialogHeader>
                            <DialogTitle>Pilih Periode:</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col space-y-4">

                            {/* <div className="text-center">
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
                            </div> */}

                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => setFilterType("date")}
                                    variant={filterType === "date" ? "default" : "outline"}
                                >
                                    Harian
                                </Button>
                                <Button
                                    onClick={() => setFilterType("month")}
                                    variant={filterType === "month" ? "default" : "outline"}
                                >
                                    Bulanan
                                </Button>
                            </div>

                            {filterType === "date" ? (
                                <div className="text-center">
                                    {/* Existing date inputs */}

                                    <div className="text-center">
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


                                </div>
                            ) : (
                                <div className="text-center space-y-2">
                                    <Label>Pilih Bulan dan Tahun:</Label>
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
                                </div>
                            )}

                            {/* <Button onClick={handleDateSubmit}>TAMPILKAN</Button> */}
                            <Button onClick={filterType === "date" ? handleDateSubmit : handleMonthYearSubmit}>
                                TAMPILKAN
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {data && (
                    <DataTable columns={columns} data={data} dateStart={dateStart} dateEnd={dateEnd} />
                )}
            </div>
        </PageLayout>
    )
}