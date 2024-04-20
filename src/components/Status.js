import React from 'react';
import { twMerge } from 'tailwind-merge';
import { statusOptions } from '../constant';

const colorDict = {
    [statusOptions.NOT_STARTED]: 'bg-red-200 text-red-800',
    [statusOptions.RUNNING]: 'bg-yellow-200 text-yellow-800',
    [statusOptions.PROCESSING]: 'bg-grey-200 text-grey-800 opacity-50 cursor-not-allowed',
    [statusOptions.COMPLETED]: 'bg-green-200 text-green-800',
};

const sizeDict = {
    small: 'py-2 text-md w-1/2',
    large: 'py-2 text-lg w-1/4',
};

const Status = ({ status, size = 'large' }) => {
    let className = twMerge(
        ' flex justify-center rounded-lg font-semibold',
        colorDict[status],
    );

    className = twMerge(className, sizeDict[size]);
    return <div className={className}>{status}</div>;
};

export default Status;
