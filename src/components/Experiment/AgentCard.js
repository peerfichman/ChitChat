import React from 'react';
import { useState } from 'react';
import EngagementLevelRange from '../agent/EngagementLevelRange';

const AgentCard = ({ relevantAgent, agents, setAgent }) => {
    const [newEngagementLevel, setNewEngagementLevel] = useState(
        relevantAgent.agent_eng,
    );
    const modifyAgent = (value, field) => {
        const updatedAgents = agents.map((agent) => {
            if (agent.id === relevantAgent.id) {
                return { ...agent, [field]: value };
            }
            return agent;
        });
        setAgent(updatedAgents);
    };

    const removeAgent = () => {
        const updatedAgents = agents.filter(
            (agent) => agent.id !== relevantAgent.id,
        );
        setAgent(updatedAgents);
    };

    const modifyEngagementLevel = (value) => {
        if (value < 25) {
            return;
        }
        value = parseFloat(value) / 100;
        const updatedAgents = agents.map((agent) => {
            if (agent.id === relevantAgent.id) {
                return { ...agent, agent_eng: value };
            }
            return agent;
        });
        setAgent(updatedAgents);
        setNewEngagementLevel(value);
    };

    return (
        <div className="flex flex-col border border-gray-500 p-2 rounded-lg ">
            <div className="flex justify-end">
                <button onClick={removeAgent}>❌</button>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="block text-lg font-medium ml-1">
                        name
                    </label>
                    <input
                        type="text"
                        className="border cursor-text  py-3 px-2  block w-full rounded-lg text-sm "
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
                        className="border py-3 px-2 pe-9 block w-full  rounded-lg text-sm "
                        onChange={(e) =>
                            modifyAgent(e.target.value, 'sentiment')
                        }>
                        <option>Positive</option>
                        <option>Negative</option>
                    </select>
                </div>
                <EngagementLevelRange
                    newEngagementLevel={newEngagementLevel}
                    modifyEngagementLevel={modifyEngagementLevel}
                />
            </div>
        </div>
    );
};

export default AgentCard;
