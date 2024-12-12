'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import useCashFlowContext from "@/context/cashflow-context";
import { getMonth, toLocalDate, toQueryDate } from '@/lib/tanggal';
//import { useCfStore } from './cf-store';

function WidgetPeriode() {
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const [dateStart, setDateStart] = useState(firstDayOfMonth);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    //const [filterType, setFilterType] = useState("all"); // "all", "date" or "month"

    const { subTitleCf, filterType, start, end, setSubTitleCf, setFilterType, setPeriodeOn, setStartContext, setEndContext } = useCashFlowContext();
    //const { isPeriodeOK, setIsPeriodeOK } = useCfStore();

    const getData = async () => { }


    const handleDateSubmit = async () => {
        if (dateStart && dateEnd) {
            // const fetchedData = await getData();
            // setData(fetchedData);
            console.log('DATES')
            console.log('Start:', dateStart)
            console.log('End:', dateEnd)
            //fetchData(dateStart, dateEnd);
            //setIsDialogOpen(false);
            //setIsPeriodeOK(true);
            setPeriodeOn(true)
            setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(dateEnd) + ' dateStart: ' + toQueryDate(dateStart))
            const newStart = toQueryDate(dateStart)
            const newEnd = toQueryDate(dateEnd)
            setStartContext(newStart)
            setEndContext(newEnd)
        }
    };

    const handleMonthYearSubmit = () => {
        const year = parseInt(selectedYear);
        const month = parseInt(selectedMonth);
        const monthName = getMonth(month);
        //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        //const monthName = monthNames[month];
        const start = new Date(year, month, 1).toISOString().split('T')[0];
        const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
        console.log('MONTHLY')
        console.log('Month:', monthName)
        console.log('Year:', year)
        //fetchData(start, end);
        //setIsDialogOpen(false);
        //setIsPeriodeOK(true);
        setPeriodeOn(true)
        setSubTitleCf('Periode: ' + monthName + ' ' + year)
    };

    const handleAllPeriode = () => {
        setPeriodeOn(false)
    }

    return (
        <div className="flex flex-col space-y-4">

            <div className="flex space-x-2">
                <Button
                    onClick={() => {

                        setFilterType("all")
                        setSubTitleCf("Semua")

                    }}
                    variant={filterType === "all" ? "default" : "outline"}
                >
                    SEMUA
                </Button>
                <Button
                    onClick={() => {

                        setFilterType("date")
                        //setSubTitleCf("Pilih Periode...")
                        handleDateSubmit()

                    }}
                    variant={filterType === "date" ? "default" : "outline"}
                >
                    Harian
                </Button>
                <Button
                    onClick={() => {

                        setFilterType("month")
                        //setSubTitleCf("Pilih Bulan/Tahun...")
                        handleMonthYearSubmit()

                    }}
                    variant={filterType === "month" ? "default" : "outline"}
                >
                    Bulanan
                </Button>
            </div>

            {filterType === "all" ? (
                <div onClick={handleAllPeriode}></div>
            ) : (
                <>
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



                    )

                    }

                </>
            )}

            {/* <Button onClick={handleDateSubmit}>TAMPILKAN</Button> */}
            <Button onClick={filterType === "date" ? handleDateSubmit : handleMonthYearSubmit}>
                PERBAHARUI DATA
            </Button>
        </div>
    )
}

export default WidgetPeriode