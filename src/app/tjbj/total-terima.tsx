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


