import React from 'react'
import Divider from '@/components/Divider'

function SubTotalAktivitas({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between p-2'>
                <p className='text-lg font-bold'>{title}</p>
                <p className='text-lg font-bold'>{value}</p>
            </div>
        </>
    )
}

export default SubTotalAktivitas
