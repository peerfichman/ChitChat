import React, { useState } from 'react';
import DetailObject from '../DetailObject';
import { chatURL } from '../../constants/generalConstants';
import { statusOptions } from '../../constants/experimentsConstants';
import EditableDetailObject from './../EditableDetailObject';
import { updateExperimentPrompt } from '../../requests/experiments';

const ExperimentDetails = ({ experiment }) => {
    const [prompt, setPrompt] = useState(experiment.exp_provoking_prompt);
    const [isEditingPrompt, setIsEditingPrompt] = useState(false);
    console.log('experiment', experiment);
    return (
        <div className="grid w-full grid-cols-2">
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
            {experiment.exp_status == statusOptions.NOT_STARTED ? (
                <DetailObject
                    title="Login Link"
                    value="Start the experiment to get the login link"
                />
            ) : (
                <DetailObject
                    title="Login Link"
                    value={`${chatURL}/${experiment.exp_id}`}
                />
            )}
            <DetailObject
                title="Maximum Participants"
                value={experiment.exp_num_participants}
            />
        </div>
    );
};

export default ExperimentDetails;
