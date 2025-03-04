"use client"

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

function WidgetSubtitlePeriode() {

    const { filterType, subTitle } = useNeracaSaldoContext();
    return (
        <div>
            <h2 className="text-xl text-blue-600 dark:text-orange-500">{subTitle}</h2>
        </div>
    )
}

export default WidgetSubtitlePeriode