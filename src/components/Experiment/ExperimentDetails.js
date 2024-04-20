import React from 'react';
import ExperimentDetail from './ExperimentDetail';
import { statusOptions } from '../../constant';
const ExperimentDetails = ({ experiment }) => {
    return (
        <div className="grid grid-cols-2 w-full">
            <ExperimentDetail title="ID" value={experiment.exp_id} />
            <ExperimentDetail
                title="Created At"
                value={String(experiment.exp_created_at).split('T')[0]}
            />
            <ExperimentDetail title="Subject" value={experiment.exp_subject} />
            <ExperimentDetail
                title="Provoking Prompt"
                value={experiment.exp_provoking_prompt}
            />
            {experiment.exp_status == statusOptions.RUNNING ? (
                <ExperimentDetail
                    title="Login Link"
                    value={`http://localhost:3000/login/${experiment.exp_messages_col_id}`}
                />
            ) : (
                <ExperimentDetail
                    title="Login Link"
                    value="Start the experiment to get the login link"
                />
            )}
        </div>
    );
};

export default ExperimentDetails;
