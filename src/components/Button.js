import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ text, onclick, color = 'blue' }) => {
    let bgColor = `bg-${color}-500`;
    let className = twMerge(
        'text-sm text-white rounded-lg w-1/4 h-10',
        bgColor,
    );
    return (
        <button className={className} onClick={onclick}>
            {text}
        </button>
    );
};

export default Button;
