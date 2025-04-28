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

const YearSelector = () => {
    const { setSubTitle, setStartContext, setEndContext } = useNeracaSaldoContext();

    const currentYear = new Date().getFullYear();
    const lastYear = (currentYear - 1).toString();
    const years = Array.from({ length: 4 }, (_, i) => (currentYear - i).toString());

   // Set default values: lastYear for yearFrom, currentYear for yearTo
   const [yearFrom, setYearFrom] = useState(lastYear);
   const [yearTo, setYearTo] = useState(currentYear.toString());
   const [showComponent, setShowComponent] = useState(false);

    const updateDateRange = (fromYear: string, toYear: string) => {
        
        // Set start date : 1 April fromYear
        setStartContext(`${fromYear}-04-01`);

        // Set end date: 31 Maret toYear
        setEndContext(`${toYear}-03-31`);
        
        // Update subtitle with the year range
        setSubTitle(`Periode: 1 April ${fromYear} - 31 Maret ${toYear}`);
    };


    // Initialize the date range with default values
    React.useEffect(() => {
        updateDateRange(lastYear, currentYear.toString());
    }, []);

    React.useEffect(() => {
        updateDateRange(yearFrom, yearTo);
        setShowComponent(false);
    }, [yearFrom, yearTo]);

    const handleYearFromChange = (value: string) => {
        const newYearFrom = value;
        const newYearTo = (parseInt(value) + 1).toString();
        setYearFrom(newYearFrom);
        setYearTo(newYearTo);
        updateDateRange(newYearFrom, newYearTo);
        setShowComponent(true);
    };

    const handleYearToChange = (value: string) => {
        const newYearTo = value;
        const newYearFrom = (parseInt(value) - 1).toString();
        setYearFrom(newYearFrom);
        setYearTo(newYearTo);
        updateDateRange(newYearFrom, newYearTo);
        setShowComponent(true);
    };

    const handleButtonClick = () => {
        setShowComponent(true);
    };

    return (
        <>
            <div className="flex gap-4 py-1">
                <div className="w-300 flex-none">
                    <Select onValueChange={handleYearFromChange} value={yearFrom}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tahun Awal" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yearValue) => (
                                <SelectItem 
                                    key={yearValue} 
                                    value={yearValue}
                                    disabled={parseInt(yearValue) >= currentYear}
                                >
                                    {yearValue}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-300 flex-none">
                    <Select onValueChange={handleYearToChange} value={yearTo}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tahun Akhir" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yearValue) => (
                                <SelectItem 
                                    key={yearValue} 
                                    value={yearValue}
                                    disabled={parseInt(yearValue) <= parseInt(yearFrom)}
                                >
                                    {yearValue}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant={'outline'} onClick={handleButtonClick}>REFRESH</Button>
            </div>

            <div>
                {showComponent && <ShowNSData />}
            </div>
        </>
    );
};

export default YearSelector;