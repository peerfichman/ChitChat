import React from 'react';
import { statusOptions } from '../constant';
import { createGraph } from '../requests/metric';
import { useNavigate } from 'react-router-dom';

const ChangeStatusButton = ({ status, setStatus, experiment }) => {
    const navigate = useNavigate();

    const statusDict = {
        [statusOptions.NOT_STARTED]: 'Run Experiment',
        [statusOptions.RUNNING]: 'End Experiment',
        [statusOptions.COMPLETED]: 'See Results',
    };

    const handleStatusChange = () => {
        if (status === statusOptions.NOT_STARTED) {
            setStatus('Running');
        } else if (status === statusOptions.RUNNING) {
            setStatus('Completed');
            console.log(experiment.exp_messages_col_id);
            createGraph(experiment.exp_messages_col_id);
        } else if (status === statusOptions.COMPLETED) {
            // setStatus('Running');
            navigate(`/experiment/metric/${experiment.exp_messages_col_id}`);
        }
    };

    // return status === statusOptions.COMPLETED ? (
    //     <></>
    // ) : (
    //     <button
    //         onClick={handleStatusChange}
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //         {statusDict[status]}
    //     </button>
    // );

    return (
        <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {statusDict[status]}
        </button>
    );
};

export default ChangeStatusButton;
