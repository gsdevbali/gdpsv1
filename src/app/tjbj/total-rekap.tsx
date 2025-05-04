import React from 'react'
import Divider from '@/components/Divider'

function SubTotalRekap({ value, title }: { value: string; title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>{title}</p>
                <p className='text-lg text-blue-500 font-bold '>{value}</p>
            </div>
        </>
    )
}

export default SubTotalRekap



// import React from 'react'
// import Divider from '@/components/Divider'

// function SubTotalDK({ valueD, valueK }: { valueD: string, valueK: string}) {
//     return (
//         <>
//             <Divider />
//             <div className='flex w-full pr-2'>
//                 {/* <p className='text-lg font-bold'>{title}</p> */}
//                 <div className='w-1/2'>
//                     <p className='text-end font-bold'>{valueD}</p>
//                 </div>
//                 <div className='w-1/2'>
//                     <p className='text-end font-bold'>{valueK}</p>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SubTotalDK
