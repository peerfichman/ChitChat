import React from 'react';
import { statusOptions } from '../constant';
import { createGraph } from '../requests/metric';
import { useNavigate } from 'react-router-dom';

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
            setStatus('Running');
        } else if (status === statusOptions.RUNNING) {
            setStatus('Processing');
            console.log("processing");
            createGraph(experiment.exp_messages_col_id).then(() => {
                setStatus('Completed');
                console.log("completed");
            });
        } else if (status === statusOptions.COMPLETED) {
            navigate(`/experiment/metric/${experiment.exp_messages_col_id}`);
        }
    };

    return (
        <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {statusDict[status]}
        </button>
    );
};

export default ChangeStatusButton;
