import React from 'react'
import Divider from './Divider'

function TulisTotalRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between p-2'>
                <p className='text-[1.6em] font-bold'>Total {title}:</p>
                <p className='text-[1.6em] font-bold'>{value}</p>
            </div>
        </>
    )
}

export default TulisTotalRp