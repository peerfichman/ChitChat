import React from 'react';

const ExperimentDetail = ({ title, value }) => {
    return (
        <div className="p-2">
            <p className="mb-1 text-lg font-bold">{title}</p>
            <p>{value}</p>
        </div>
    );
};

export default ExperimentDetail;
