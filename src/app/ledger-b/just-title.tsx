import React from 'react'
import Divider from '@/components/Divider'

function JustTitle({ title }: { title: string }) {
    return (
        <>
            <Divider />
            <div>
                <p className='text-start font-bold'>{title}</p>
            </div>
        </>
    )
}

export default JustTitle
