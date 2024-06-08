import React from 'react';
import { statusOptions } from '../constants/experimentsConstants';
import { createGraph } from '../requests/metric';
import { useNavigate } from 'react-router-dom';
import { sendProvokingPrompt } from '../requests/FireBase';
import Button from './Button';

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
            setStatus('Running');
        } else if (status === statusOptions.RUNNING) {
            setStatus('Completed');
        } else if (status === statusOptions.COMPLETED) {
            navigate(`/experiment/metric/${experiment.exp_id}`);
        }
    };

    if (status === statusOptions.PROCESSING) {
        return (
            <div className="mr-7 flex items-center">
                <Button enabled={false} />
            </div>
        );
    }
    return (
        <Button
            text={statusDict[status]}
            onclick={handleStatusChange}
            width="[150px]"
        />
    );
};

export default ChangeStatusButton;
