import React from 'react'
import Divider from './Divider'

function TulisTotalRpGreen({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between p-2 text-green-500 pb-2'>
                <p className='text-lg font-bold'>Total {title}:</p>
                <p className='text-lg font-bold'>{value}</p>
            </div>
        </>
    )
}

export default TulisTotalRpGreen