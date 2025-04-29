import React, { Suspense } from 'react'
import Loading from '@/components/Loading';

function SubTotalABX({ value, title }: { value: string; title: string }) {
    return (
        <>
            <Suspense fallback={<Loading section="......" />}>
                <div className='flex justify-between p-0.5'>
                    <p className='text-m font-medium'>{title}</p>
                    <p className='text-m font-medium'>{value}</p>
                </div>
            </Suspense>
        </>
    )
}

export default SubTotalABX

