import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
    text,
    onclick = () => {},
    color = 'blue',
    enabled = true,
}) => {
    let bgColor = `bg-${color}-500`;
    let className = twMerge(
        'text-sm text-white rounded-lg w-1/4 h-10',
        bgColor,
    );
    if (!enabled) {
        className = twMerge(className, 'opacity-50 cursor-not-allowed');
        return (
            <button className={className} onClick={onclick} disabled>
                {text}
            </button>
        );
    }

    return (
        <button className={className} onClick={onclick}>
            {text}
        </button>
    );
};

export default Button;
