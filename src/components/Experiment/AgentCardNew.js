import React from 'react';
import { useState } from 'react';

const AgentCardNew = (agentId, agents, setAgents) => {
    const modifyAgent = (value, field) => {
        console.log(agentId);
        console.log(agents);
        console.log(value);
        console.log(field);
        const updatedAgents = agentId.agents.map((agent) => {
            if (agent.id === agentId.agentId) {
                return { ...agent, [field]: value };
            }
            return agent;
        });
        console.log(updatedAgents);
        agentId.setAgents(updatedAgents);
    };

    return (
        <div className="flex flex-col gap-3 border border-gray-500 p-2 rounded-lg ">
            <div>
                <label className="block text-lg font-medium ml-1">name</label>
                <input
                    type="text"
                    className="border cursor-text  py-3 px-4 block w-full rounded-lg text-sm "
                    placeholder="Agent name"
                    onChange={(e) => modifyAgent(e.target.value, 'name')}
                />
            </div>
            <div>
                <label className="block text-lg font-medium ml-1">
                    sentiment
                </label>
                <select
                    defaultValue="Positive"
                    className="border border-blue-400 py-3 px-4 pe-9 block w-full  rounded-lg text-sm "
                    onChange={(e) => modifyAgent(e.target.value, 'sentiment')}>
                    <option>Positive</option>
                    <option>Negative</option>
                </select>
            </div>
        </div>
    );
};

export default AgentCardNew;
