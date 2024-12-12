"use client"

import useCashFlowContext from "@/context/cashflow-context";

function WidgetSubtitlePeriode() {

    const { filterType, subTitleCf } = useCashFlowContext();

    return (

        <div>
            {filterType === "all" ? null :
                <h2>{subTitleCf}</h2>
            }
        </div>

    )


}

export default WidgetSubtitlePeriode