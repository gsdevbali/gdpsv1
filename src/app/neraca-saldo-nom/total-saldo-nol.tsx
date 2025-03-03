import React from 'react'
import Divider from '@/components/Divider'

function SubTotalNol() {
    return (
        <>
            <Divider />
            <div className='pr-2'>
                {/* <p className='text-lg font-bold'>{title}</p> */}
                <p className='text-end font-bold'>Rp. 0</p>
            </div>
        </>
    )
}

export default SubTotalNol
