'use client'

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react";
import Link from "next/link";

const HomeButton = () => {
    const handleHome = () => {
        window.location.href = '/';
    };

    return (
        <Button onClick={handleHome} variant="outline" size="icon" className="print:hidden">
            <Home />
        </Button>
    );
};

export default HomeButton;