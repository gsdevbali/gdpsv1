import React from 'react';

function SubTotalAll({ value, title }: { value: string; title: string }) {

    return (
        <>
            <div className='flex justify-between p-0.5 items-center'>
                <p className='text-m font-light'>{title}</p>
                <p className='text-xl font-bold'>{value}</p>
            </div>
        </>
    );
}

export default SubTotalAll;

