'use client'

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react";

const PrintButton = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button onClick={handlePrint} variant="outline" size="icon" className="print:hidden">
            <Printer />
        </Button>
    );
};

export default PrintButton;