import React from 'react';
import DetailObject from '../DetailObject';
import { chatURL } from '../../constants/generalConstants';
import { statusOptions } from '../../constants/experimentsConstants';

const ExperimentDetails = ({ experiment }) => {
    return (
        <div className="grid w-full grid-cols-2">
            <DetailObject
                title="Created At"
                value={experiment.exp_created_at}
            />
            <DetailObject title="Subject" value={experiment.exp_subject} />
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
                title="Provoking Prompt"
                value={experiment.exp_provoking_prompt}
            />
        </div>
    );
};

export default ExperimentDetails;
