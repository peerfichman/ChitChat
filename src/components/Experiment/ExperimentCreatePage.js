import React, { useState } from 'react';
import InputBlock from '../InputBlock';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import AgentCard from './AgentCard';
import { createExperiment } from '../../requests/experiments';
import { createAgent } from '../../requests/agents';
import { useNavigate } from 'react-router';

const ExperimentCreatePage = () => {
    const [expSubject, setExpSubject] = useState('');
    const [expPrompt, setExpPrompt] = useState('');
    const [expName, setExpName] = useState('');
    const [AIAgents, setAIAgents] = useState([]);
    const navigate = useNavigate();

    const newExperiment = async () => {
        if (!expSubject || !expName) {
            alert('Please fill the required fields.');
            return;
        }
        const newExperiment = await createExperiment({
            expSubject,
            expPrompt,
            expName,
        });

        AIAgents.forEach(async (agent) => {
            await createAgent(agent, newExperiment.exp_id);
        });

        navigate('/experiments');
    };

    const addAgentBlock = () => {
        setAIAgents([
            ...AIAgents,
            { id: uuidv4(), name: '', sentiment: 'Positive', agent_eng: 0.25 },
        ]);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c] gap-3">
            <button
                className="absolute top-5 left-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                onClick={() => navigate('/experiments')}>
                Back
            </button>
            <h1 className="mb-3 mt-5 text-4xl font-bold text-white">
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
                <Button text="Add Agent" onclick={addAgentBlock} />
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
            <button
                className="bg-blue-500 text-white py-3 px-4 rounded-lg"
                onClick={newExperiment}>
                Create Experiment
            </button>
        </div>
    );
};
export default ExperimentCreatePage;
