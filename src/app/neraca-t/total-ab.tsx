import React from 'react';

function SubTotalAB({ value, title }: { value: string; title: string }) {

    return (
        <>
            <div className='flex justify-between p-0.5'>
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p></p>
                <p className='text-m font-medium'>{value}</p>
            </div>
        </>
    );
}

export default SubTotalAB;

