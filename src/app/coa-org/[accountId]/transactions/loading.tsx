import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        //<div className="flex h-screen text-left">
            <div className="flex flex-row items-start align-middle p-8">
                <Spinner size="medium"/> <div className="w-[10px]"></div>
                <p className="text-left text-2xl text-muted-foreground">Memuat Data Transaksi per-Akun, tunggu...      </p>
            </div>
        //</div> run de
    )
}