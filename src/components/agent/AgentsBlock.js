import React from 'react';
import AgentDetails from './AgentDetails';

const AgentsBlock = ({ agents }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="px-2">
                <p className="text-2xl font-bold">Agents</p>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
                {agents.length > 0 ? (
                    agents.map((agent) => (
                        <AgentDetails key={agent.agent_id} agent={agent} />
                    ))
                ) : (
                    <div className="px-2 text-2xl font-bold text-gray-500">
                        None
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentsBlock;
