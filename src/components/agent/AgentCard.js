import React from 'react';
import { useState } from 'react';
import Range from './Range';
import {
    Sentiments,
    OpinionAlignment,
    ActivityLevels,
    NumberOfMessages,
    listOfTopics,
    AgentCardTitles,
    AgentParametersInDB,
    TalkingStyle,
} from '../../constants/agentsConstants';
import CheckboxList from './checkboxList';
import SelectBlock from './SelectBlock';

const AgentCard = ({ relevantAgent, agents, setAgent }) => {
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
        <div className="flex flex-col border border-gray-500 p-2 rounded-lg ">
            <div className="flex justify-end">
                <button onClick={removeAgent}>❌</button>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="block text-lg font-medium ml-1">
                        {AgentCardTitles.NAME}
                        <span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                        type="text"
                        className="border cursor-text py-2 px-2  block w-full rounded-lg text-sm "
                        placeholder="Agent name"
                        onChange={(e) =>
                            modifyAgent(
                                e.target.value,
                                AgentParametersInDB.NAME,
                            )
                        }
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
                <CheckboxList
                    title={AgentCardTitles.TOPICS_OF_INTEREST}
                    options={listOfTopics}
                    setSelected={modifyAgent}
                    agentField={AgentParametersInDB.TOPICS_OF_INTEREST}
                />
                <Range
                    title={AgentCardTitles.ACTIVITY_LEVEL}
                    value={activityLevel}
                    setValue={modifyActivityRange}
                    min={0}
                    max={ActivityLevels.ACTIVITY_5}
                    agentField={AgentParametersInDB.ACTIVITY_LEVEL}
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
