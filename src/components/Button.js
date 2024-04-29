import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
    text,
    onclick = () => {},
    width = '1/4',
    color = 'blue',
    enabled = true,
}) => {
    const bgColor = `bg-${color}-500`;
    const w = `w-${width}`;
    let className = twMerge('text-sm text-white rounded-lg h-10', bgColor);
    className = twMerge(className, w);
    if (!enabled) {
        className = twMerge(className, 'opacity-50 cursor-not-allowed');
        return (
            <button className={className} disabled>
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
