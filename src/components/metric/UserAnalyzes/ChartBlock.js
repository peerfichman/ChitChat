import React from 'react';

const ChartBlock = ({ title, footer, children }) => {
    return (
        <div className="flex flex-col items-center border p-3">
            <p className="pl-7 text-xl font-bold">{title}</p>
            {children}
            <p className="text-md pl-7 opacity-50">{footer}</p>
        </div>
    );
};

export default ChartBlock;
