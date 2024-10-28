
export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center p-8">
                <p className="text-center text-4xl text-foreground">... Memuat Data...</p>
            </div>
        </div>
    )
}