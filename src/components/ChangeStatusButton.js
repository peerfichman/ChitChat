import React from 'react';
import { statusOptions } from '../constant';

const ChangeStatusButton = ({ status, setStatus }) => {
    const statusDict = {
        [statusOptions.NOT_STARTED]: 'Run Experiment',
        [statusOptions.RUNNING]: 'End Experiment',
        [statusOptions.COMPLETED]: 'Restart Experiment',
    };

    const handleStatusChange = () => {
        if (status === statusOptions.NOT_STARTED) {
            setStatus('Running');
        } else if (status === statusOptions.RUNNING) {
            setStatus('Completed');
        } else if (status === statusOptions.COMPLETED) {
            // THIS IF SHOULD BE REMOVED IN THE FINAL IMPLEMENTATION
            setStatus('Not Started');
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
