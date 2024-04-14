import React, { useState } from 'react';
import InputBlock from '../InputBlock';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import AgentCard from './AgentCard';

// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { v4 as uuidv4 } from 'uuid';

const ExperimentCreatePage = () => {
    const [expSubject, setExpSubject] = useState('');
    console.log(expSubject);
    const [expPrompt, setExpPrompt] = useState('');
    console.log(expPrompt);
    const [AIAgents, setAIAgents] = useState([]);

    // const newExperiment = async (e) => {
    //     e.preventDefault();

    //     await addDoc(collection(db, 'experiments'), {
    //         id: uuidv4(),
    //         subject: expSubject,
    //         openingPrompt: expPrompt,
    //         created: serverTimestamp(),
    //         aiAgents: AIAgents,
    //         active: true,
    //     });
    //     setExpSubject('');
    //     setExpPrompt('');
    //     setAIAgents([]);
    // };
    const addAgentBlock = () => {
        setAIAgents([...AIAgents, { id: uuidv4(), name: '', sentiment: '' }]);
    };

    // const setAgent = () => {
    //     console.log('id');
    // };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c] gap-3">
            <h1 className="mb-3 mt-5 text-4xl font-bold text-white">
                Create Experiment
            </h1>
            <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3">
                <InputBlock
                    title="Subject"
                    placeHolder="Physics"
                    setValue={setExpSubject}
                />
                <InputBlock
                    title="Opening Prompt"
                    placeHolder="What is the speed of light?"
                    setValue={setExpPrompt}
                />
                <Button text="Add Agent" onclick={addAgentBlock} />
                <div className="grid grid-cols-2 gap-2">
                    {AIAgents.map((agent) => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
            <button className="bg-blue-500 text-white py-3 px-4 rounded-lg">
                Create Experiment
            </button>
        </div>
    );
};
export default ExperimentCreatePage;
