'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import useCashFlowContext from "@/context/cashflow-context";
import { getMonth, toLocalDate, toQueryDate } from '@/lib/tanggal';
import { revalidatePath } from 'next/cache';
import refreshPath from './refresh-path';
//import { useCfStore } from './cf-store';

function WidgetPeriode() {
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    // First Day + 1 - supaya menampilkan di widget sesuai
    const newFirst = new Date(firstDayOfMonth);
    newFirst.setDate(newFirst.getDate() + 1);
    const newDateStart = newFirst.toISOString().split('T')[0];

    //const [dateStart, setDateStart] = useState(newDateStart);
    //const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    //const [filterType, setFilterType] = useState("all"); // "all", "date" or "month"

    const { subTitleCf, filterType, start, end, periodeOn, setSubTitleCf, setFilterType, setPeriodeOn, setStartContext, setEndContext } = useCashFlowContext();
    //const { isPeriodeOK, setIsPeriodeOK } = useCfStore();

    // Set dateStart lokal = start-end global ( dari state di Context )
    // const [dateStart, setDateStart] = useState(start);
    // const [dateEnd, setDateEnd] = useState(end);

    // Set dateStart - dateEnd = today
    const [dateStart, setDateStart] = useState(new Date().toISOString().split('T')[0]); // Set default to today
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]); // Set default to today

    //const getData = async () => { }
    //const date1 = "01-01-2000"

    // End + 1 - supaya Query menampilkan data yg benar
    const newEnd = new Date(dateEnd);
    const newStart = toQueryDate(dateStart)
    //const newEnd = toQueryDate(dateEnd)
    newEnd.setDate(newEnd.getDate() + 1);
    const newDateEnd = newEnd.toISOString().split('T')[0];


    console.log('START FilterType:', filterType)
    console.log('START DATES: - ON WIDGET-PERIODE')

    // Pakai newDateEnd disini, jadi awal
    //setStartContext(toQueryDate(dateStart))
    //setEndContext(toQueryDate(newDateEnd))
    console.log('start:...', start)
    console.log('end:...', end)
    console.log('Periode is: ', periodeOn)

    //setPeriodeOn(false)

    const handleDateSubmit = async () => {
        // if (dateStart && dateEnd) {

        // console.log('DATES SUBMIT:')
        // console.log('Start:', toQueryDate(dateStart))
        // console.log('End:', toQueryDate(dateEnd))
        // console.log('Periode is: ', periodeOn)

        //setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(dateEnd) + ' dateStart: ' + toQueryDate(dateStart))
        setPeriodeOn(true)
        setFilterType("date")
        setSubTitleCf("Pilih Periode...")
        // const newStart = toQueryDate(start)
        // const newEnd = toQueryDate(end)
        setStartContext(newStart)
        setEndContext(newDateEnd)

        //setSubTitleCf(toLocalDate(start) + ' - ' + toLocalDate(end) + ' dateStart: ' + toQueryDate(newStart))
        //console.log('NEW Start:', newStart)
        // }
    };

    const handleMonthYearSubmit = () => {
        const year = parseInt(selectedYear);
        const month = parseInt(selectedMonth);
        const monthName = getMonth(month);
        const start = new Date(year, month, 1).toISOString().split('T')[0];
        const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
        //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        //const monthName = monthNames[month];
        //setPeriodeOn(true)
        setPeriodeOn(true)
        setFilterType("month")
        //setSubTitleCf("Pilih Bulan/Tahun...")
        setSubTitleCf('Periode: ' + monthName + ' ' + year)
        //
        console.log('FilterType:', filterType)
        setStartContext(toQueryDate(start))
        setEndContext(toQueryDate(end))
        console.log('MONTHLY SUBMIT:')
        console.log('Month:', monthName)
        console.log('Year:', year)
        console.log('Start:', toQueryDate(start))
        console.log('End:', toQueryDate(end))
        console.log('Periode is: ', periodeOn)
        //fetchData(start, end);
        //setIsDialogOpen(false);
        //setIsPeriodeOK(true);
        //refreshPath()
    };

    const handleAllPeriode = () => {
        // console.log('HANDLE ALL:')
        // console.log('FilterType:',filterType)
        // setPeriodeOn(false)
        // setStartContext("01-01-2000")
        // setEndContext("12-31-3024")
        // console.log('End ----- HANDLE ALL:')

        setStartContext("01-01-2000")
        setEndContext("12-31-3024")

        setPeriodeOn(false)
        setFilterType("all")
        setSubTitleCf("Semua")

        console.log('ALL BUTTON - in handle:')
        console.log(start)
        console.log(end)
        refreshPath()
    }

    const handleSubTitleDate = () => {
        setSubTitleCf(toLocalDate(start) + ' - ' + toLocalDate(end) + ' dateStart: ' + toQueryDate(start))
    }

    const handleSubTitleMonth = () => {
        setSubTitleCf(selectedMonth)
    }



    return (
        <div className="flex flex-col space-y-4">

            <div className="flex space-x-2">
                <Button
                    onClick={() => {
                        //setPeriodeOn(false)
                        handleAllPeriode()

                    }}
                    variant={filterType === "all" ? "default" : "outline"}
                >
                    SEMUA
                </Button>
                <Button
                    onClick={() => {
                        //setPeriodeOn(true)
                        setFilterType("date")
                        setStartContext(dateStart)
                        setEndContext(dateEnd)
                        //setSubTitleCf("Pilih Periode...")
                        setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(dateEnd) + ' [ dateStart: ' + toQueryDate(start) + ' dateEnd: ' + toQueryDate(end) + ' ]')
                        //handleDateSubmit()

                        refreshPath()


                    }}
                    variant={filterType === "date" ? "default" : "outline"}
                >
                    Harian
                </Button>
                <Button
                    onClick={() => {

                        // setPeriodeOn(true)
                        setFilterType("month")
                        // setSubTitleCf("Pilih Bulan/Tahun...")
                        //handleMonthYearSubmit()
                        refreshPath()

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
                                    //value={start}
                                    value={dateStart}
                                    onChange={(e) => {
                                        console.log('Date Start Input: ', e.target.value)
                                        setDateStart(e.target.value)
                                        setStartContext(e.target.value)
                                        setSubTitleCf(toLocalDate(e.target.value) + ' - ' + toLocalDate(dateEnd) + ' [ dateStart: ' + toQueryDate(start) + ' dateEnd: ' + toQueryDate(end) + ' ]')
                                        // handleSubTitleDate()
                                        refreshPath()

                                    }
                                    }
                                    placeholder="Start Date"
                                    className="w-full"
                                />
                                <div className="h-2" />
                                <Label>Sampai dengan:</Label>
                                <Input
                                    type="date"
                                    //value={end}
                                    value={dateEnd}
                                    onChange={(e) => {
                                        setDateEnd(e.target.value)
                                        setEndContext(e.target.value)
                                        setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(e.target.value) + ' [ dateStart: ' + toQueryDate(start) + ' dateEnd: ' + toQueryDate(end) + ' ]')

                                        console.log('Date End Input: ', e.target.value)
                                        //handleSubTitleDate()
                                        //handleDateSubmit()
                                        refreshPath()

                                    }
                                    }
                                    placeholder="End Date"
                                />
                            </div>


                        </div>
                    ) : (
                        <div className="text-center space-y-2">
                            <Label>Pilih Bulan dan Tahun:</Label>
                            {/* <Select value={selectedMonth} onValueChange={setSelectedMonth}> */}
                            <Select value={selectedMonth} onValueChange={

                                (value) => {
                                    //handleMonthYearSubmit()
                                    setSelectedMonth(value)
                                    //setSelectedYear(selectedYear)

                                    const year = parseInt(selectedYear);
                                    const month = parseInt(value);
                                    const monthName = getMonth(month);
                                    setSubTitleCf('Periode: ' + monthName + ' ' + selectedYear)

                                    const firstDayOfSelectedMonth = new Date(year, month, 1).toISOString().split('T')[0];
                                    const lastDayOfSelectedMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];

                                    setStartContext(toQueryDate(firstDayOfSelectedMonth))
                                    setEndContext(toQueryDate(lastDayOfSelectedMonth))
                                    refreshPath()
                                }

                            }>
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



                            {/* <Select value={selectedYear} onValueChange={setSelectedYear}> */}
                            <Select value={selectedYear} onValueChange={
                                () => {
                                    handleMonthYearSubmit()
                                    refreshPath()
                                }
                            }>
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
            {/* <Button onClick={filterType === "date" ? handleDateSubmit : handleMonthYearSubmit}>
                PERBAHARUI DATA
            </Button> */}
        </div>
    );


}

export default WidgetPeriode