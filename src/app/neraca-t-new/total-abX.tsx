import React from 'react'
import Divider from '@/components/Divider'

function SubTotalABX({ value, title }: { value: string; title: string }) {
    return (
        <>
            {/* <Divider /> */}
            {/* <div className='flex justify-between'>
                <p> </p>
                <p className='text-end text-lg font-bold '>{value}</p>
            </div> */}

            <div className='flex justify-between p-0.5'>
                <p className='text-m font-medium'>{title}</p>
                <p className='text-m font-medium'>{value}</p>
            </div>
        </>
    )
}

export default SubTotalABX

