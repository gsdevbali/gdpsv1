'use client'

import { Button } from "@/components/ui/button"

const PrintButton = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button onClick={handlePrint} className="print:hidden">
            CETAK
        </Button>
    );
};

export default PrintButton;