'use client'

import { Button } from "@/components/ui/button"
import { Home, Printer } from "lucide-react";

// HOME BUTTON
export const HomeButton = () => {
    const handleHome = () => {
        window.location.href = '/';
    };

    return (
        <Button onClick={handleHome} variant="outline" size="icon" className="print:hidden">
            <Home />
        </Button>
    );
};

// PRINT BUTTON
export const PrintButton = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button onClick={handlePrint} variant="outline" size="icon" className="print:hidden">
            <Printer />
        </Button>
    );
};