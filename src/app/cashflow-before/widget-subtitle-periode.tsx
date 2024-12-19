"use client"

import useCashFlowContext from "@/context/cashflow-context";

function WidgetSubtitlePeriode() {

    const { filterType } = useCashFlowContext();

    return (

        <div>
            {filterType === "all" ? null :

                (<>
                    {filterType === "date" ?
                        (<h2>Harian</h2>)
                        :
                        (<h2>Bulanan</h2>)

                    }
                </>)

            }
        </div>

    )


}

export default WidgetSubtitlePeriode