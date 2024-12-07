"use client"

import { useEffect } from 'react';
import { useCfStore } from './cf-store'

function UpdateCfStore(value: number) {
    const cfStore = useCfStore();
    cfStore.setTotalCf(value);
    // useEffect(() => {
    //     cfStore.setTotalCf(value); // Call setTotalCf inside useEffect
    // }, [cfStore]);
    return null;
}

export default UpdateCfStore