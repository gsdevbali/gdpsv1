import React from 'react'
import Divider from '@/components/Divider'

function SubTotalTerima({ value, title }: { value: string; title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p className='text-sm font-bold'>Sub Total {title}</p>
                <p className='text-md text-blue-500 font-medium '>{value}</p>
            </div>
        </>
    )
}

export default SubTotalTerima



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
