import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="flex flex-row items-start align-middle py-4 px-4">
            <Spinner size="small" /> <div className="w-[10px]"></div>
            <p className="text-left text-1xl text-muted-foreground">Memuat Data, tunggu...      </p>
        </div>
    )
}