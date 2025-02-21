import React from 'react'
import Divider from './Divider'

function TulisTotalRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between p-0'>
                {/* <p className='text-lg font-bold'>Total {title}:</p> */}
                <p> </p>
                <p className='text-lg font-medium'>{value}</p>
            </div>
        </>
    )
}

export default TulisTotalRp