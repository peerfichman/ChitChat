import React from 'react';
import GraphComponent from './GraphComponent';

const ExperimentGraph = ({ id }) => {
    return (
        <div className="bg-slate-200 h-96 rounded-2 w-1/2 border border-gray-800 shadow-md">
            <GraphComponent id={id} />
        </div>
    );
};

export default ExperimentGraph;
