import React from 'react';
import { statusOptions } from '../constant';
import { createGraph } from '../requests/metric';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { sendProvokingPrompt } from '../requests/FireBase';
const ChangeStatusButton = ({ status, setStatus, experiment }) => {
    const navigate = useNavigate();

    const statusDict = {
        [statusOptions.NOT_STARTED]: 'Run Experiment',
        [statusOptions.RUNNING]: 'End Experiment',
        [statusOptions.PROCESSING]: 'Processing...',
        [statusOptions.COMPLETED]: 'See Results',
    };

    const handleStatusChange = () => {
        if (status === statusOptions.NOT_STARTED) {
            sendProvokingPrompt(
                experiment.exp_id,
                experiment.exp_provoking_prompt,
            );
            //run listener
            setStatus('Running');
        } else if (status === statusOptions.RUNNING) {
            //stop listener
            setStatus('Processing');
            createGraph(experiment.exp_id).then(() => {
                setStatus('Completed');
            });
        } else if (status === statusOptions.COMPLETED) {
            navigate(`/experiment/metric/${experiment.exp_id}`);
        }
    };

    const className =
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ';
    if (status === statusOptions.PROCESSING) {
        twMerge(className, 'opacity-50 cursor-not-allowed');
    }
    return (
        <button onClick={handleStatusChange} className={className}>
            {statusDict[status]}
        </button>
    );
};

export default ChangeStatusButton;
