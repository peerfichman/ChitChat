import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TailSpin } from 'react-loader-spinner';

const Button = ({
    text = '',
    onclick = () => {},
    width = '1/4',
    color = 'blue',
    enabled = true,
}) => {
    const bgColor = `bg-${color}-500 hover:bg-${color}-700`;
    const w = `w-${width}`;
    let className = twMerge(
        ' font-bold text-sm text-white rounded-lg h-10',
        bgColor,
    );
    className = twMerge(className, w);

    if (!enabled) {
        return (
            <TailSpin
                visible={true}
                height="50"
                width="50"
                color="blue"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        );
    }

    return (
        <button className={className} onClick={onclick}>
            {text}
        </button>
    );
};

export default Button;
