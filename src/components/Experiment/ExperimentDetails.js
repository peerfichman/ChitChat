import React from 'react';
import ExperimentDetail from './ExperimentDetail';
import { statusOptions, chatURL } from '../../constant';
const ExperimentDetails = ({ experiment }) => {
    return (
        <div className="grid grid-cols-2 w-full">
            <ExperimentDetail
                title="Created At"
                value={String(experiment.exp_created_at).split('T')[0]}
            />
            <ExperimentDetail title="Subject" value={experiment.exp_subject} />
            {experiment.exp_status == statusOptions.NOT_STARTED ? (
                <ExperimentDetail
                    title="Login Link"
                    value="Start the experiment to get the login link"
                />
            ) : (
                <ExperimentDetail
                    title="Login Link"
                    value={`${chatURL}/${experiment.exp_id}`}
                />
            )}
            <ExperimentDetail
                title="Provoking Prompt"
                value={experiment.exp_provoking_prompt}
            />
        </div>
    );
};

export default ExperimentDetails;
