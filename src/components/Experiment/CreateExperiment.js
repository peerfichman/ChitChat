import React, { useState } from 'react';
import InputBlock from '../InputBlock';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import AgentCard from '../agent/AgentCard';
import { createExperiment } from '../../requests/experiments';
import { useNavigate } from 'react-router';
import {
    Sentiments,
    OpinionAlignment,
    TalkingStyle,
    ActivityLevels,
    NumberOfMessages,
    AgentParametersInDB,
} from '../../constants/agentsConstants';
import PageTitle from '../PageTitle';
import { useParams } from 'react-router-dom';

const CreateExperiment = () => {
    const { study_id } = useParams();
    const [experiment, setExperiment] = useState({
        expSubject: '',
        expPrompt: '',
        expName: '',
    });
    const [AIAgents, setAIAgents] = useState([]);
    const [creatingExperiment, setCreatingExperiment] = useState(false);

    const navigate = useNavigate();

    const handleExperimentChanges = (key, value) => {
        setExperiment({ ...experiment, [key]: value });
    };

    const handleExperimentCreation = async () => {
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
        if (!experiment.expName) {
            alert('Please choose a name for the experiment.');
            setCreatingExperiment(false);
            return;
        }
        if (!experiment.expSubject) {
            alert('Please choose a subject for the experiment.');
            setCreatingExperiment(false);
            return;
        }
        await createExperiment(experiment, AIAgents, study_id);
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
        <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Create Experiment</PageTitle>
            <div className="flex w-full max-w-lg flex-col gap-3 rounded-lg bg-white p-4 shadow-lg">
                <InputBlock
                    title="Name"
                    placeHolder='"Gun License Rules"'
                    setValue={handleExperimentChanges}
                    attribute="expName"
                    isRequired={true}
                />
                <InputBlock
                    title="Subject"
                    placeHolder='"The new rules for a gun license"'
                    setValue={handleExperimentChanges}
                    attribute="expSubject"
                    isRequired={true}
                />
                <InputBlock
                    title="Opening Prompt"
                    placeHolder='"The new rules can make women abuse more common."'
                    setValue={handleExperimentChanges}
                    attribute="expPrompt"
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
            <div className="flex w-full max-w-lg items-center justify-center">
                {!creatingExperiment ? (
                    <button
                        onClick={handleExperimentCreation}
                        className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                        Create Experiment
                    </button>
                ) : (
                    <Button enabled={false} />
                )}
            </div>
        </div>
    );
};
export default CreateExperiment;
