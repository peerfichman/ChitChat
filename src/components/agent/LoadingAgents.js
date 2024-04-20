import React from 'react';

const LoadingAgents = () => {
    return (
        <div className="gap-2 flex flex-col">
            <div className="px-2">
                <p className="text-2xl font-bold">Agents</p>
            </div>
            <div className="text-lg font-bold rounded-xl p-3 bg-slate-50 border w-1/3">
                Retrieving agents...
            </div>
        </div>
    );
};

export default LoadingAgents;
