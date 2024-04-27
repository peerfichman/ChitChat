import React, { useState } from 'react';
import InputBlock from '../InputBlock';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import AgentCard from '../agent/AgentCard';
import { createExperiment } from '../../requests/experiments';
import { createAgent } from '../../requests/agents';
import { useNavigate } from 'react-router';
import {
    Sentiments,
    OpinionAlignment,
    TalkingStyle,
    ActivityLevels,
    NumberOfMessages,
    AgentParametersInDB,
} from '../../constants/agentsConstants';

const ExperimentCreatePage = () => {
    const [expSubject, setExpSubject] = useState('');
    const [expPrompt, setExpPrompt] = useState('');
    const [expName, setExpName] = useState('');
    const [AIAgents, setAIAgents] = useState([]);
    const [creatingExperiment, setCreatingExperiment] = useState(false);

    const navigate = useNavigate();

    const newExperiment = async () => {
        setCreatingExperiment(true);
        if (AIAgents.length > 0) {
            const agentNames = AIAgents.map(
                (agent) => agent[AgentParametersInDB.NAME],
            );
            const allAgentNamesNotEmpty = agentNames.every(
                (name) => name !== '',
            );
            if (!allAgentNamesNotEmpty) {
                alert('Please pick a name for all AI agents.');
                setCreatingExperiment(false);
                return;
            }
            const duplicateNames = agentNames.some(
                (name, index) => agentNames.indexOf(name) !== index,
            );
            if (duplicateNames) {
                alert('Please choose unique names for each AI agents.');
                setCreatingExperiment(false);
                return;
            }
        }
        if (!expSubject) {
            alert('Please choose a subject for the experiment.');
            setCreatingExperiment(false);
            return;
        }
        if (!expName) {
            alert('Please choose a name for the experiment.');
            setCreatingExperiment(false);
            return;
        }
        await createExperiment(
            {
                expSubject,
                expPrompt,
                expName,
            },
            AIAgents,
        );
        navigate('/experiments');
    };

    const addAgentBlock = () => {
        setAIAgents([
            ...AIAgents,
            {
                id: uuidv4(),
                [AgentParametersInDB.NAME]: '',
                [AgentParametersInDB.SENTIMENT]: Sentiments.POSITIVE,
                [AgentParametersInDB.OPINION_ALIGNMENT]:
                    OpinionAlignment.SUPPORT,
                [AgentParametersInDB.TALKING_STYLE]: TalkingStyle.CASUAL,
                [AgentParametersInDB.ACTIVITY_LEVEL]: ActivityLevels.ACTIVITY_1,

                [AgentParametersInDB.TOPICS_OF_INTEREST]: [],
                [AgentParametersInDB.NUMBER_OF_MESSAGES]:
                    NumberOfMessages.ACTIVITY_3,
            },
        ]);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-100 gap-3">
            <h1 className="mb-4 mt-5 text-5xl font-bold text-black">
                Create Experiment
            </h1>
            <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3">
                <InputBlock
                    title="Name"
                    placeHolder='"Gun License Rules"'
                    setValue={setExpName}
                    isRequired={true}
                />
                <InputBlock
                    title="Subject"
                    placeHolder='"The new rules for a gun license"'
                    setValue={setExpSubject}
                    isRequired={true}
                />
                <InputBlock
                    title="Opening Prompt"
                    placeHolder='"The new rules can make women abuse more common."'
                    setValue={setExpPrompt}
                />
                {AIAgents.length < 3 ? (
                    <Button text="Add Agent" onclick={addAgentBlock} />
                ) : (
                    <Button text="Add Agent" enabled={false} />
                )}
                <div className="grid grid-cols-2 gap-3">
                    {AIAgents.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            relevantAgent={agent}
                            agents={AIAgents}
                            setAgent={setAIAgents}
                        />
                    ))}
                </div>
            </div>
            {!creatingExperiment ? (
                <button
                    className="bg-blue-500 text-white py-3 px-4 rounded-lg my-3 w-48"
                    onClick={newExperiment}>
                    Create Experiment
                </button>
            ) : (
                <button
                    className="bg-blue-500 text-white py-3 px-4 rounded-lg my-3 w-48 opacity-50 cursor-not-allowed"
                    onClick={() => {}}
                    disabled>
                    Creating...
                </button>
            )}
        </div>
    );
};
export default ExperimentCreatePage;
