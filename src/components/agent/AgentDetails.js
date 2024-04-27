import React from 'react';
import ExperimentDetail from '../Experiment/ExperimentDetail';
import { AgentCardTitles } from '../../constants/agentsConstants';
const AgentDetails = ({ agent }) => {
    return (
        <div className="flex flex-col rounded-xl p-3 bg-slate-50 border max-w-[230px]">
            <p className="font-bold text-gray-800 text-2xl truncate">
                {agent.agent_name}
            </p>
            <ExperimentDetail
                title={AgentCardTitles.SENTIMENT}
                value={agent.sentiment}
            />
            <ExperimentDetail
                title={AgentCardTitles.OPINION_ALIGNMENT}
                value={agent.opinion_alignment}
            />
            <ExperimentDetail
                title={AgentCardTitles.TALKING_STYLE}
                value={agent.talking_style}
            />
            <ExperimentDetail
                title={AgentCardTitles.ACTIVITY_LEVEL}
                value={agent.activity_level}
            />
            <ExperimentDetail
                title={AgentCardTitles.NUMBER_OF_MESSAGES}
                value={agent.messages_to_reply}
            />
            <ExperimentDetail
                title={AgentCardTitles.TOPICS_OF_INTEREST}
                value={agent.topics_of_interest
                    .map((topic) => topic)
                    .join(', ')}
            />
        </div>
    );
};

export default AgentDetails;
