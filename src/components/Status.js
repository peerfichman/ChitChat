import React from 'react';
import { twMerge } from 'tailwind-merge';

const colorDict = {
    'Not Started': 'bg-red-200 text-red-800',
    'In Progress': 'bg-yellow-200 text-yellow-800',
    Completed: 'bg-green-200 text-green-800',
};

const sizeDict = {
    small: 'py-1 px-2 text-xs w-1/3',
    large: 'py-3 px-4 text-sm',
};

const Status = ({ status, size = 'large' }) => {
    let className = twMerge(
        'inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none',
        colorDict[status],
    );

    className = twMerge(className, sizeDict[size]);
    return <button className={className}>{status}</button>;
};

export default Status;
