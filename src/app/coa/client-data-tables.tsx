"use client";

import { useState } from "react";

import { DataTable } from "./data-tables";
import { columns } from "./columns2";
import { useRouter } from "next/navigation";

// interface ClientDataTableProps {
//     initialData: any[];
// }

// export function ClientDataTable({ initialData }: ClientDataTableProps) {
//     const router = useRouter();

//     const refreshData = () => {
//         router.refresh(); // This triggers a server-side refresh
//     };

//     return <DataTable columns={columns(refreshData)} data={initialData} />;
// }

export function ClientDataTable({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [highlightedId, setHighlightedId] = useState<number | null>(null);

    const refreshData = (editedId: number) => {
        setHighlightedId(editedId);
        router.refresh();
        
        // Clear the highlight after 2 seconds
        setTimeout(() => {
            setHighlightedId(null);
        }, 2000);
    };

    return <DataTable 
        columns={columns(refreshData, highlightedId)} 
        data={initialData} 
        highlightedId={highlightedId}
    />;
}