import React from 'react';
import ExperimentDetail from '../Experiment/ExperimentDetail';
import { AgentCardTitles } from '../../constants/agentsConstants';
const AgentDetails = ({ agent }) => {
    return (
        <div className="flex flex-col rounded-xl p-3 bg-slate-50 border">
            <p className="font-bold text-gray-800 text-2xl truncate">
                {agent.agent_name}
            </p>
            <div className="flex flex-col w-full">
                <ExperimentDetail
                    title={AgentCardTitles.SENTIMENT}
                    value={agent.sentiment}
                    text="text-md"
                />
                <ExperimentDetail
                    title={AgentCardTitles.OPINION_ALIGNMENT}
                    value={agent.opinion_alignment}
                    text="text-md"
                />
                <ExperimentDetail
                    title={AgentCardTitles.TALKING_STYLE}
                    value={agent.talking_style}
                    text="text-md"
                />
                <ExperimentDetail
                    title={AgentCardTitles.ACTIVITY_LEVEL}
                    value={agent.activity_level}
                    text="text-md"
                />
                <ExperimentDetail
                    title={AgentCardTitles.NUMBER_OF_MESSAGES}
                    value={agent.messages_to_reply}
                    text="text-md"
                />
                <ExperimentDetail
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
