import React from 'react';
import AgentDetails from './AgentDetails';

const AgentsBlock = ({ agents }) => {
    return (
        <div className="gap-2 flex flex-col">
            <div className="px-2">
                <p className="text-2xl font-bold">Agents</p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
                {agents &&
                    agents.map((agent) => (
                        <AgentDetails key={agent.agent_id} agent={agent} />
                    ))}
            </div>
        </div>
    );
};

export default AgentsBlock;
