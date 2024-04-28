import React from 'react';

const ExperimentDetail = ({ title, value, text = 'text-lg' }) => {
    const className = `mb-1 ${text} font-bold`;
    return (
        <div className="p-2 max-w-96">
            <p className={className}>{title}</p>
            <p>{value}</p>
        </div>
    );
};

export default ExperimentDetail;
