import React from 'react'
import Divider from '@/components/Divider'

function SubTotalAktivitasBefore({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='pr-2'>
                {/* <p className='text-lg font-bold'>{title}</p> */}
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}

export default SubTotalAktivitasBefore
