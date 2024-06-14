import React, { useState } from 'react';
import DetailObject from '../DetailObject';
import { chatURL } from '../../constants/generalConstants';
import EditableDetailObject from './../EditableDetailObject';
import {
    updateExperimentPrompt,
    updateExperimentSubject,
    updateSimultaneousResponses,
} from '../../requests/experiments';
import { statusOptions } from '../../constants/experimentsConstants';
import { TbSwitchHorizontal } from 'react-icons/tb';

const ExperimentDetails = ({ experiment, setExperiment, agentsLength }) => {
    const [prompt, setPrompt] = useState(experiment.exp_provoking_prompt);
    const [isEditingPrompt, setIsEditingPrompt] = useState(false);
    const [subject, setSubject] = useState(experiment.exp_subject);
    const [isEditingSubject, setIsEditingSubject] = useState(false);

    const change_agent_response = (val) => {
        const newVal = !experiment.simultaneous_responses;
        updateSimultaneousResponses(experiment.exp_id, newVal);
        setExperiment({
            ...experiment,
            simultaneous_responses: newVal,
        });
    };

    return (
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <DetailObject title="Research" value={experiment.study_name} />
            <EditableDetailObject
                title="Subject"
                value={subject}
                setValue={(val) => {
                    setSubject(val);
                    updateExperimentSubject(experiment.exp_id, val);
                }}
                isEditing={isEditingSubject}
                setIsEditing={setIsEditingSubject}
            />
            <DetailObject
                title="Created At"
                value={experiment.exp_created_at}
            />
            <EditableDetailObject
                title="Provoking Prompt"
                value={prompt}
                setValue={(val) => {
                    setPrompt(val);
                    updateExperimentPrompt(experiment.exp_id, val);
                }}
                isEditing={isEditingPrompt}
                setIsEditing={setIsEditingPrompt}
            />
            <DetailObject
                title="Login Link"
                value={`${chatURL}/${experiment.exp_id}`}
            />
            {agentsLength > 0 && (
                <div className="flex items-end gap-1">
                    {experiment.simultaneous_responses ? (
                        <DetailObject
                            title="Agents Response"
                            value={'Simultaneously'}
                        />
                    ) : (
                        <DetailObject
                            title="Agents Response"
                            value={'Individually'}
                        />
                    )}
                    {experiment.exp_status == statusOptions.NOT_STARTED && (
                        <div
                            onClick={() => change_agent_response()}
                            className="cursor-pointer content-end pb-3 hover:opacity-70">
                            <TbSwitchHorizontal size={20} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExperimentDetails;
