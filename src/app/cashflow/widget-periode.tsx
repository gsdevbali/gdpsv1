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
import BeforePageData from './before-page-data';
//import { useCfStore } from './cf-store';

function WidgetPeriode() {

    const periodeTextStart = "Tentukan Periode dan Perbaharui Data ... ";
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    // First Day + 1 - supaya menampilkan di widget sesuai
    const newFirst = new Date(firstDayOfMonth);
    newFirst.setDate(newFirst.getDate() + 1);
    const newDateStart = newFirst.toISOString().split('T')[0];

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    //const [filterType, setFilterType] = useState("all"); // "all", "date" or "month"

    const { subTitleCf, filterType, start, end, periodeOn, setSubTitleCf, setFilterType, setPeriodeOn, setStartContext, setEndContext } = useCashFlowContext();
    //const { isPeriodeOK, setIsPeriodeOK } = useCfStore();


    // Set dateStart - dateEnd = today
    const [dateStart, setDateStart] = useState(new Date().toISOString().split('T')[0]); // Set default to today
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]); // Set default to today

    // End + 1 - supaya Query menampilkan data yg benar
    const newEnd = new Date(dateEnd);
    const newStart = toQueryDate(dateStart)
    //const newEnd = toQueryDate(dateEnd)
    newEnd.setDate(newEnd.getDate() + 1);
    const newDateEnd = newEnd.toISOString().split('T')[0];

    useEffect(() => {
        //const today = new Date().toISOString().split('T')[0];
        setReady(true);

    }, []); // Empty dependency array to run only once on mount


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
        setLoading(true);
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
        //setSubTitleCf('Periode: ' + monthName + ' ' + year)
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
        setSubTitleCf('Periode: ' + monthName + ' ' + selectedYear)
        //refreshPath()
        setLoading(false);
    };

    const handleAllPeriode = () => {
        // console.log('HANDLE ALL:')
        // console.log('FilterType:',filterType)
        // setPeriodeOn(false)
        // setStartContext("01-01-2000")
        // setEndContext("12-31-3024")
        // console.log('End ----- HANDLE ALL:')
        setLoading(true)
        setStartContext("01-01-2000")
        setEndContext("12-31-3024")

        setPeriodeOn(false)
        setFilterType("all")
        setSubTitleCf("Semua")

        console.log('ALL BUTTON - in handle:')
        console.log(start)
        console.log(end)
        setLoading(false)
        //refreshPath()
    }

    const handleSubTitleDate = () => {
        setSubTitleCf(toLocalDate(start) + ' - ' + toLocalDate(end) + ' dateStart: ' + toQueryDate(start))
    }

    const handleSubTitleMonth = () => {
        setSubTitleCf(selectedMonth)
    }

    const handleRefresh = () => {
        //setStartContext(dateStart)
        //setEndContext(dateEnd)
        handleFilterTypeSubmit()
        //refreshPath()
    }


    const handleFilterTypeSubmit = () => {
        //setLoading(true)
        switch (filterType) {
            case "all":
                handleAllPeriode();
                refreshPath();
                break;
            case "date":
                setStartContext(dateStart);
                setEndContext(dateEnd);
                setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(dateEnd));
                //refreshPath();
                break;
            case "month":
                // setSubTitleCf("Pilih Bulan/Tahun...")
                //setFilterType("month")
                //setSelectedMonth(selectedMonth)
                // const year = parseInt(selectedYear);
                const month = parseInt(selectedMonth);
                const monthName = getMonth(month);
                // const firstDayOfSelectedMonth = new Date(year, month, 1).toISOString().split('T')[0];
                // const lastDayOfSelectedMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];
                // const newEnd = new Date(lastDayOfSelectedMonth);
                // newEnd.setDate(newEnd.getDate() + 2);
                // const newlastDayOfSelectedMonth = newEnd.toISOString().split('T')[0];
                //
                //setStartContext(toQueryDate(firstDayOfSelectedMonth));
                setStartContext(toQueryDate(start));
                //
                //setEndContext(toQueryDate(newlastDayOfSelectedMonth));
                setEndContext(toQueryDate(end));
                //setSubTitleCf('Periode: ' + monthName + ' ' + selectedYear);
                //const testX = ' Data Start to End: ' + start + ' - ' + end
                setSubTitleCf('Periode: ' + monthName + ' ' + selectedYear)


                //refreshPath();
                break;
            default:
                console.log("Unknown filter type");
        }
        //setLoading(false)
        setReady(true)
    };



    return (
        <div className="flex flex-col space-y-4">

            <div className="flex space-x-2">
                <Button
                    onClick={() => {
                        setFilterType("all")
                        setReady(false)
                    }
                    }
                    variant={filterType === "all" ? "default" : "outline"}
                >
                    SEMUA
                </Button>
                <Button
                    onClick={() => {
                        setFilterType("date")
                        setSubTitleCf(periodeTextStart)
                        setReady(false)
                    }
                    }
                    variant={filterType === "date" ? "default" : "outline"}
                >
                    Harian
                </Button>
                {/* <Button
                    onClick={() => {
                        setFilterType("month")
                        setSubTitleCf(periodeTextStart)
                        setSelectedMonth('')
                        setReady(false)
                    }
                    }
                    variant={filterType === "month" ? "default" : "outline"}
                >
                    Bulanan
                </Button> */}
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
                                        //console.log('Date Start Input: ', e.target.value)
                                        setDateStart(e.target.value)
                                        setStartContext(e.target.value)
                                        setSubTitleCf(toLocalDate(e.target.value) + ' - ' + toLocalDate(dateEnd))
                                        // handleSubTitleDate()
                                        //refreshPath()
                                        // console.log('----------DATE-START-CEK------------')
                                        // console.log('Start',e.target.value)
                                        // console.log('End',dateEnd)
                                        const newDateStart = e.target.value;
                                        if (newDateStart) { // Check if the date is not empty
                                            //console.log('Date Start Input: ', newDateStart);
                                            setDateStart(newDateStart);
                                            setStartContext(newDateStart);
                                            setSubTitleCf(toLocalDate(newDateStart) + ' - ' + toLocalDate(dateEnd));
                                        }
                                        setReady(false)

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

                                        // setDateEnd(e.target.value)
                                        // setEndContext(e.target.value)
                                        // setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(e.target.value))

                                        //console.log('Date End Input: ', e.target.value)
                                        // console.log('----------DATE-END-CEK------------')
                                        // console.log('Start',dateStart)
                                        // console.log('End',e.target.value)
                                        //handleSubTitleDate()
                                        //handleDateSubmit()
                                        //refreshPath()
                                        const newDateEnd = e.target.value;
                                        if (newDateEnd) { // Check if the date is not empty
                                            setDateEnd(newDateEnd);
                                            setEndContext(newDateEnd);
                                            setSubTitleCf(toLocalDate(dateStart) + ' - ' + toLocalDate(newDateEnd));
                                        }
                                        setReady(false)

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

                                    const firstDayOfSelectedMonth = new Date(year, month, 1).toISOString().split('T')[0];
                                    const lastDayOfSelectedMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];

                                    // End-Date adjusted to make sure 'correct' query result

                                    const newStart = new Date(firstDayOfSelectedMonth)
                                    //newStart.setDate(newStart.getDate()-1);
                                    newStart.setDate(newStart.getDate() + 1);
                                    const newEnd = new Date(lastDayOfSelectedMonth);
                                    //newEnd.setDate(newEnd.getDate()+2);
                                    newEnd.setDate(newEnd.getDate() + 1);
                                    // tranform Date to String
                                    //const newlastDayOfSelectedMonth = newEnd.toISOString().split('T')[0];
                                    const newStartX = newStart.toISOString().split('T')[0];
                                    const newEndX = newEnd.toISOString().split('T')[0];

                                    // console.log('-------CEK-START-END-CONTEXT-VALUE-ORG---------')
                                    // console.log('Start Cx Org',start)
                                    // console.log('End Cx Org',end)

                                    setStartContext(toQueryDate(newStartX))
                                    setEndContext(toQueryDate(newEndX))
                                    // setStartContext(toQueryDate(firstDayOfSelectedMonth))
                                    // setEndContext(toQueryDate(lastDayOfSelectedMonth))

                                    // Delay - so Start and End is correct values
                                    setTimeout(() => {
                                        console.log('Delayed for 2 seconds');
                                    }, 2000);

                                    // console.log('=========================================')
                                    // console.log('--------------CEK-ORIGINAL-DATES---------')
                                    // console.log('Start Org',firstDayOfSelectedMonth)
                                    // console.log('End Org',lastDayOfSelectedMonth)
                                    // console.log('=========================================')
                                    // console.log('--------------CEK-NEW-DATES-VALUE---------')
                                    // console.log('Start New',newStartX)
                                    // console.log('End New',newEndX)
                                    // console.log('=========================================')
                                    // console.log('--------CEK-START-END-CONTEXT-VALUE---------')
                                    // console.log('Start Cx',start)
                                    // console.log('End Cx',end)
                                    //setEndContext(toQueryDate(newlastDayOfSelectedMonth))

                                    //subtitle
                                    // const testX = ' Data Start to End: ' + newStartX + ' - ' + newEndX
                                    // setSubTitleCf('Periode: ' + monthName + ' ' + selectedYear + testX)
                                    setSelectedMonth(value)
                                    //refreshPath()
                                    setReady(false)
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
                                    setReady(false)
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



            {(!ready) ?
                <Button onClick={handleRefresh}>PERBAHARUI DATA</Button> : null
            }

            {/* {
                (!loading) ? <BeforePageData isOK={loading}/> : <h2>Belum Ada Data ....</h2>
            } */}

            <BeforePageData isOK={ready} month={parseInt(selectedMonth)} />

            {/* <Button onClick={filterType === "date" ? handleDateSubmit : handleMonthYearSubmit}>
                PERBAHARUI DATA
            </Button> */}
        </div>
    );


}

export default WidgetPeriode