import React from 'react'
import Divider from './Divider'

function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className='text-m font-medium'>{title}</p>
                <p className='text-m font-medium'>{value}</p>
            </div>
        </>
    )
}

export default TulisRekapRp