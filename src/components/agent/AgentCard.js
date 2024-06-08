import React from 'react';
import { useState } from 'react';
import Range from './Range';
import {
    Sentiments,
    OpinionAlignment,
    NumberOfMessages,
    AgentCardTitles,
    AgentParametersInDB,
    TalkingStyle,
} from '../../constants/agentsConstants';
import SelectBlock from './SelectBlock';

const AgentCard = ({ relevantAgent, agents, setAgent, change_checkbox }) => {
    const [activityLevel, setActivityLevel] = useState(
        relevantAgent.activity_level,
    );
    const [numberOfMessages, setNumberOfMessages] = useState(
        relevantAgent.messages_to_reply,
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
        if (updatedAgents.length <= 1) {
            change_checkbox('simultaneous_responses', false);
        }
    };

    const modifyActivityRange = (value, field) => {
        if (value < 1) {
            return;
        }
        modifyAgent(value, field);
        setActivityLevel(value);
    };

    const modifyNumberOfMessagesRange = (value, field) => {
        if (value < 1) {
            return;
        }
        modifyAgent(value, field);
        setNumberOfMessages(value);
    };

    return (
        <div className="flex flex-col rounded-lg border border-gray-500 p-2 ">
            <div className="flex justify-end">
                <button onClick={removeAgent}>❌</button>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="ml-1 block text-lg font-medium">
                        {AgentCardTitles.NAME}
                        <span className="pl-1 text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="block w-full cursor-text rounded-lg  border px-2 py-2 text-sm "
                        placeholder="Agent name"
                        onChange={(e) =>
                            modifyAgent(
                                e.target.value,
                                AgentParametersInDB.NAME,
                            )
                        }
                        maxLength={30}
                    />
                </div>
                <SelectBlock
                    title={AgentCardTitles.SENTIMENT}
                    options={Sentiments}
                    selected={relevantAgent.sentiment}
                    setSelected={modifyAgent}
                    agentField={AgentParametersInDB.SENTIMENT}
                />
                <SelectBlock
                    title={AgentCardTitles.OPINION_ALIGNMENT}
                    options={OpinionAlignment}
                    selected={relevantAgent.opinion_alignment}
                    setSelected={modifyAgent}
                    agentField={AgentParametersInDB.OPINION_ALIGNMENT}
                />
                <SelectBlock
                    title={AgentCardTitles.TALKING_STYLE}
                    options={TalkingStyle}
                    selected={relevantAgent.talking_style}
                    setSelected={modifyAgent}
                    agentField={AgentParametersInDB.TALKING_STYLE}
                />
                <Range
                    title={AgentCardTitles.ACTIVITY_LEVEL}
                    value={activityLevel}
                    setValue={modifyActivityRange}
                    min={0}
                    max={100}
                    agentField={AgentParametersInDB.ACTIVITY_LEVEL}
                    isPrecentage={true}
                />
                <Range
                    title={AgentCardTitles.NUMBER_OF_MESSAGES}
                    value={numberOfMessages}
                    setValue={modifyNumberOfMessagesRange}
                    min={0}
                    max={NumberOfMessages.ACTIVITY_5}
                    agentField={AgentParametersInDB.NUMBER_OF_MESSAGES}
                />
            </div>
        </div>
    );
};

export default AgentCard;
