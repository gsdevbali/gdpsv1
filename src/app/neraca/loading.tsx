import global from "@/config"

export default function Loading() {
    // Or a custom loading skeleton component
    return
    <p className="text-center text-2xl font-bold  bg-red-500">{global.pageInfo.loadingText}</p>
}