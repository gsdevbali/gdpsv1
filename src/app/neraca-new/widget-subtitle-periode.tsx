"use client"

import useNeracaSaldoContext from "@/context/neraca-saldo-context";

function WidgetSubtitlePeriode() {

    const { filterType, subTitle } = useNeracaSaldoContext();

    return (

        <div>
            {filterType === "all" ? null :
                <h2>{subTitle}</h2>
            }
        </div>

    )


}

export default WidgetSubtitlePeriode