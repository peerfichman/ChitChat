import React from 'react';
import DetailObject from '../DetailObject';
import { AgentCardTitles } from '../../constants/agentsConstants';
const AgentDetails = ({ agent }) => {
    return (
        <div className="flex flex-col rounded-xl border bg-slate-50 p-3">
            <p className="truncate text-2xl font-bold text-gray-800">
                {agent.agent_name}
            </p>
            <div className="flex w-full flex-col">
                <DetailObject
                    title={AgentCardTitles.SENTIMENT}
                    value={agent.sentiment}
                    text="text-md"
                />
                <DetailObject
                    title={AgentCardTitles.OPINION_ALIGNMENT}
                    value={agent.opinion_alignment}
                    text="text-md"
                />
                <DetailObject
                    title={AgentCardTitles.TALKING_STYLE}
                    value={agent.talking_style}
                    text="text-md"
                />
                <DetailObject
                    title={AgentCardTitles.ACTIVITY_LEVEL}
                    value={agent.activity_level}
                    text="text-md"
                />
                <DetailObject
                    title={AgentCardTitles.NUMBER_OF_MESSAGES}
                    value={agent.messages_to_reply}
                    text="text-md"
                />
                <DetailObject
                    title={AgentCardTitles.TOPICS_OF_INTEREST}
                    value={agent.topics_of_interest
                        .map((topic) => topic)
                        .join(', ')}
                    text="text-md"
                />
            </div>
        </div>
    );
};

export default AgentDetails;
