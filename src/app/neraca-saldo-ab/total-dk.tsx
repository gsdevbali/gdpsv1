import React from 'react'
import Divider from '@/components/Divider'

function SubTotalDK({ value }: { value: string }) {
    return (
        <>
            <Divider />
            <div className='pr-2'>
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}

export default SubTotalDK
