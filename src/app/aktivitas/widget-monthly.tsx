'use client'

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useNeracaSaldoContext from "@/context/neraca-saldo-context";
import React, { useState } from 'react';
import ShowNSData from "./page-data";



const MonthYearSelector = () => {
    const { start, end, setSubTitle, setStartContext, setEndContext, setPrevStartContext, setPrevEndContext,
        setTitleMonthYear, setPrevTitleMonthYear } = useNeracaSaldoContext();

    const currentMonthIndex = new Date().getMonth(); // Get current month index (0-11)
    const currentYear = new Date().getFullYear(); // Get current year
    const years = Array.from({ length: 4 }, (_, i) => (currentYear - i).toString()); // Generate years from current year to 5 years back

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const [month, setMonth] = useState(monthNames[currentMonthIndex]); // Set default to current month

    //const [month, setMonth] = useState('');
    const currentYearString = currentYear.toString();
    const [year, setYear] = useState(currentYearString);
    const [showComponent, setShowComponent] = useState(false);

    const [selectedPeriod, setSelectedPeriod] = useState(`${month} ${year}`); // New state for selected period
    //const [prevSelectedPeriod, setPrevSelectedPeriod] = useState(``); // state for prev Title

    const [startDate, setStartDate] = useState(`${currentYearString}-01-01`); // Initialize with the first day of the current year
    const [endDate, setEndDate] = useState(`${currentYearString}-01-31`); // Initialize with the last day of January

    const [previousStartDate, setPreviousStartDate] = useState(''); // New state for previous start date
    const [previousEndDate, setPreviousEndDate] = useState(''); // New state for previous end date

    const updateStartAndEndDate = (month: string, year: string) => {
        const monthIndex = monthNames.indexOf(month) + 1; // Get month index (1-12)
        const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex; // Format month to two digits

        // Calculate the last day of the month
        const lastDay = new Date(parseInt(year), monthIndex, 0).getDate(); // Get the last day of the month

        setStartDate(`${year}-${formattedMonth}-01`); // Set start date to the first day of the month
        setEndDate(`${year}-${formattedMonth}-${lastDay}`); // Set end date to the last day of the month

        // Calculate previous month and year
        const previousMonthIndex = monthIndex === 1 ? 12 : monthIndex - 1;
        const previousYear = monthIndex === 1 ? parseInt(year) - 1 : parseInt(year);
        const formattedPreviousMonth = previousMonthIndex < 10 ? `0${previousMonthIndex}` : previousMonthIndex;
        const lastDayOfPreviousMonth = new Date(previousYear, previousMonthIndex, 0).getDate();

        setPreviousStartDate(`${previousYear}-${formattedPreviousMonth}-01`); // Set previous start date
        setPreviousEndDate(`${previousYear}-${formattedPreviousMonth}-${lastDayOfPreviousMonth}`); // Set previous end date

        // set: start - end date-range
        setStartContext(`${year}-${formattedMonth}-01`);
        setEndContext(`${year}-${formattedMonth}-${lastDay}`);

        // set: startPrev - endPrev date-range
        setPrevStartContext(`${previousYear}-${formattedPreviousMonth}-01`);
        setPrevEndContext(`${previousYear}-${formattedPreviousMonth}-${lastDayOfPreviousMonth}`);

        // Convert formattedPreviousMonth to local month name
        const localPreviousMonthName = monthNames[previousMonthIndex - 1];
        const previousYearString = previousYear.toString();
        setTitleMonthYear(selectedPeriod);
        setPrevTitleMonthYear(localPreviousMonthName + ' ' + previousYearString);

        //console.log('----------START context: ', start);
        //console.log('----------END context: ', end);

    };

    React.useEffect(() => {

        updateStartAndEndDate(month, year); // Calculate start and end dates, including previous month
        setSubTitle('Periode: ' + selectedPeriod);

    }, [month, year]);

    const handleMonthChange = (value: string) => {
        setMonth(value);
        setSelectedPeriod(`${value} ${year}`); // Update selected period
        updateStartAndEndDate(value, year); // Update start date
        setSubTitle('Periode: ' + selectedPeriod);
    };

    const handleYearChange = (value: string) => {
        setYear(value);
        setSelectedPeriod(`${month} ${value}`); // Update selected period
        updateStartAndEndDate(month, value); // Update start date
        setSubTitle('Periode: ' + selectedPeriod);
    };

    const handleButtonClick = () => {
        setSubTitle('Periode: ' + selectedPeriod);
        setShowComponent(true);
    };

    return (
        <>
            <div className="flex justify-normal space-x-2 mt-2 mb-2">
                <Select onValueChange={handleMonthChange} value={month}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                        {monthNames.map((monthName, index) => (
                            <SelectItem key={index} value={monthName}>
                                {monthName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={handleYearChange} value={year}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((yearValue) => (
                            <SelectItem key={yearValue} value={yearValue}>
                                {yearValue}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button onClick={handleButtonClick}>REFRESH</Button>


            </div>
            <div>
                {showComponent && <ShowNSData />}
            </div>
        </>
    );
};


export default MonthYearSelector;