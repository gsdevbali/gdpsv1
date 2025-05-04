"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./data-tables";
import { columns } from "./columns2";
import { useRouter } from "next/navigation";

export function ClientDataTable({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [data, setData] = useState(initialData);
    const [highlightedId, setHighlightedId] = useState<number | null>(null);

    // Update local data when initialData changes
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const refreshData = async (editedId: number) => {
        setHighlightedId(editedId);
        
        // Force a router refresh
        router.refresh();
        
        // Optional: Fetch fresh data directly
        // try {
        //     const response = await fetch(`${process.env.APP_URL}/api/abl`, {
        //         cache: 'no-store'
        //     });
        //     const freshData = await response.json();
        //     setData(freshData);
        // } catch (error) {
        //     console.error('Error refreshing data:', error);
        // }

        // Clear the highlight after animation
        setTimeout(() => {
            setHighlightedId(null);
        }, 2000);
    };

    return (
        <DataTable 
            columns={columns(refreshData, highlightedId)} 
            data={data} 
            highlightedId={highlightedId}
        />
    );
}