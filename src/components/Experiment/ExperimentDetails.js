import React, { useState } from 'react';
import DetailObject from '../DetailObject';
import { chatURL } from '../../constants/generalConstants';
import { statusOptions } from '../../constants/experimentsConstants';
import EditableDetailObject from './../EditableDetailObject';
import { updateExperimentPrompt } from '../../requests/experiments';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const ExperimentDetails = ({ experiment }) => {
    console.log(experiment);
    const [prompt, setPrompt] = useState(experiment.exp_provoking_prompt);
    const [isEditingPrompt, setIsEditingPrompt] = useState(false);
    return (
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <DetailObject title="Research" value={experiment.study_name} />
            <DetailObject title="Subject" value={experiment.exp_subject} />
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
            {experiment.simultaneous_responses ? (
                <DetailObject
                    title="Agents Response"
                    value={'Simultaneously'}
                />
            ) : (
                <DetailObject title="Agents Response" value={'Individually'} />
            )}
        </div>
    );
};

export default ExperimentDetails;
