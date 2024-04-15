import React from 'react';
import ExperimentDetail from './ExperimentDetail';

const AgentDetails = ({ agent }) => {
    return (
        <div className="flex flex-col rounded-xl p-3 bg-slate-50 border">
            <p className="font-bold text-gray-800 text-2xl">
                {agent.agent_name}
            </p>
            <ExperimentDetail title="Sentiment" value={agent.sentiment} />
            <ExperimentDetail
                title="Engagement Level"
                value={agent.level_of_engagement}
            />
        </div>
    );
};

export default AgentDetails;
