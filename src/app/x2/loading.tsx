import { Spinner } from "@/components/ui/spinner";

export default function Loading({ section }: { section: string }) {
    // Or a custom loading skeleton component
    return (
        <div className="flex flex-row items-start align-middle">
            <Spinner size="small" /> <div className="w-[10px]"></div>
            <p className="text-left text-1xl text-muted-foreground">Memuat Data: {section}, tunggu...      </p>
        </div>
    )
}