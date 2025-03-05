'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import { getMonth, toLocalDate, toQueryDate } from '@/lib/tanggal';
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

    const { subTitle, filterType, start, end, periodeOn, setSubTitle, setFilterType, setPeriodeOn, setStartContext, setEndContext } = useNeracaSaldoContext();
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

    console.log('start:...', start)
    console.log('end:...', end)
    console.log('newDateEnd:...', newDateEnd)
    console.log('Periode is: ', periodeOn)

    //setPeriodeOn(false)

    const handleDateSubmit = async () => {

        setPeriodeOn(true)
        setFilterType("date")
        setSubTitle("Pilih Periode...")
        setStartContext(newStart)
        setEndContext(newDateEnd)

        // }
    };

    const handleMonthYearSubmit = () => {
        setLoading(true);
        const year = parseInt(selectedYear);
        const month = parseInt(selectedMonth);
        const monthName = getMonth(month);
        const start = new Date(year, month, 1).toISOString().split('T')[0];
        const end = new Date(year, month + 1, 0).toISOString().split('T')[0];

        setPeriodeOn(true)
        setFilterType("month")

        console.log('FilterType:', filterType)
        setStartContext(toQueryDate(start))
        setEndContext(toQueryDate(end))
        console.log('MONTHLY SUBMIT:')
        console.log('Month:', monthName)
        console.log('Year:', year)
        console.log('Start:', toQueryDate(start))
        console.log('End:', toQueryDate(end))
        console.log('Periode is: ', periodeOn)

        setSubTitle('Periode: ' + monthName + ' ' + selectedYear)

        setLoading(false);
    };

    const handleAllPeriode = () => {

        setLoading(true)
        setStartContext("01-01-2000")
        setEndContext("12-31-3024")

        setPeriodeOn(false)
        setFilterType("all")
        setSubTitle("Semua")

        console.log('ALL BUTTON - in handle:')
        console.log(start)
        console.log(end)
        setLoading(false)

    }

    const handleSubTitleDate = () => {
        setSubTitle(toLocalDate(start) + ' - ' + toLocalDate(end) + ' dateStart: ' + toQueryDate(start))
    }

    const handleSubTitleMonth = () => {
        setSubTitle(selectedMonth)
    }

    const handleRefresh = () => {
        handleFilterTypeSubmit()
    }


    const handleFilterTypeSubmit = () => {

        switch (filterType) {
            case "all":
                handleAllPeriode();
                refreshPath();
                setReady(false);
                break;
            case "date":
                setStartContext(dateStart);
                setEndContext(dateEnd);
                setSubTitle(toLocalDate(dateStart) + ' - ' + toLocalDate(dateEnd));
                //refreshPath();
                setReady(true);
                break;
            case "month":
                const month = parseInt(selectedMonth);
                const monthName = getMonth(month);
                setStartContext(toQueryDate(start));
                setEndContext(toQueryDate(end));
                setSubTitle('Periode: ' + monthName + ' ' + selectedYear);
                setReady(false);
                break;
            default:
                console.log("Unknown filter type");
        }
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
                        setSubTitle(periodeTextStart)
                        setReady(false)
                    }
                    }
                    variant={filterType === "date" ? "default" : "outline"}
                >
                    Harian
                </Button>
                <Button
                    onClick={() => {
                        setFilterType("month")
                        setSubTitle(periodeTextStart)
                        setSelectedMonth('')
                        //setSelectedYear('')
                        setReady(false)
                    }
                    }
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

                                        setDateStart(e.target.value)
                                        setStartContext(e.target.value)
                                        setSubTitle(toLocalDate(e.target.value) + ' - ' + toLocalDate(dateEnd))

                                        const newDateStart = e.target.value;
                                        if (newDateStart) { // Check if the date is not empty

                                            setDateStart(newDateStart);
                                            setStartContext(newDateStart);
                                            setSubTitle(toLocalDate(newDateStart) + ' - ' + toLocalDate(dateEnd));
                                        }
                                        setReady(true)

                                    }
                                    }
                                    placeholder="Start Date"
                                    className="w-full"
                                />
                                <div className="h-2" />
                                <Label>Sampai dengan:</Label>
                                <Input
                                    type="date"
                                    value={dateEnd}
                                    onChange={(e) => {

                                        const newDateEnd = e.target.value;
                                        if (newDateEnd) { // Check if the date is not empty
                                            setDateEnd(newDateEnd);
                                            setEndContext(newDateEnd);
                                            setSubTitle(toLocalDate(dateStart) + ' - ' + toLocalDate(newDateEnd));
                                        }
                                        setReady(true)

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

                                    newStart.setDate(newStart.getDate() + 1);
                                    const newEnd = new Date(lastDayOfSelectedMonth);

                                    newEnd.setDate(newEnd.getDate() + 1);

                                    const newStartX = newStart.toISOString().split('T')[0];
                                    const newEndX = newEnd.toISOString().split('T')[0];

                                    setStartContext(toQueryDate(newStartX))
                                    setEndContext(toQueryDate(newEndX))
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

                                    setSelectedMonth(value)
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
                                (value) => {
                                    // handleMonthYearSubmit()
                                    // refreshPath()
                                    // setReady(false)

                                    const year = parseInt(selectedYear);
                                    const month = parseInt(selectedMonth);
                                    const monthName = getMonth(month);

                                    const firstDayOfSelectedMonth = new Date(year, month, 1).toISOString().split('T')[0];
                                    const lastDayOfSelectedMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];

                                    console.log('CEK year: ',year);
                                    console.log('CEK lastDayOfSelectedMonth: ',lastDayOfSelectedMonth);

                                    // End-Date adjusted to make sure 'correct' query result
                                    const newStart = new Date(firstDayOfSelectedMonth);

                                    newStart.setDate(newStart.getDate() + 1);
                                    const newEnd = new Date(lastDayOfSelectedMonth);

                                    newEnd.setDate(newEnd.getDate() + 1);

                                    const newStartX = newStart.toISOString().split('T')[0];
                                    const newEndX = newEnd.toISOString().split('T')[0];

                                    setStartContext(toQueryDate(newStartX))
                                    setEndContext(toQueryDate(newEndX))
                                    // Delay - so Start and End is correct values
                                    setTimeout(() => {
                                        console.log('Delayed for 2 seconds');
                                    }, 2000);

                                    setSelectedYear(value)
                                    setReady(true)
                                }
                            }>

                                {selectedMonth !== '' && (
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Tahun" />
                                    </SelectTrigger>

                                    
                                )}
                                
                                {/* <SelectTrigger>
                                    <SelectValue placeholder="Pilih Tahun" />
                                </SelectTrigger> */}
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



            {(ready) ?
                <Button onClick={handleRefresh}>PERBAHARUI DATA</Button> : null
            }

            <BeforePageData isOK={ready} month={parseInt(selectedMonth)} />

        </div>
    );


}

export default WidgetPeriode