import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';

const ResearchExperimentCard = ({
    experiment,
    navigateTo = `/experiments/${experiment.exp_id}`,
}) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex w-[300px] cursor-pointer flex-col gap-3 rounded-xl border bg-gray-50 p-4  hover:bg-gray-200"
            onClick={() => navigate(navigateTo)}>
            <p className="w-11/12 truncate text-center text-2xl font-bold text-gray-800">
                {experiment.exp_name}
            </p>
            <div className="flex gap-1">
                <p className="font-bold text-gray-500">Number of Agents:</p>
                <p className="text-gray-500">{experiment.num_agents}</p>
            </div>
            {experiment.simultaneous_responses ? (
                <div className="flex gap-1">
                    <p className="font-bold text-gray-500">Agents Response:</p>
                    <p className="text-gray-500">{'Simultaneously'}</p>
                </div>
            ) : (
                <div className="flex gap-1">
                    <p className="font-bold text-gray-500">Agents Response:</p>
                    <p className="text-gray-500">{'Individually'}</p>
                </div>
            )}
            <div className="flex gap-1">
                <p className="font-bold text-gray-500">Created At:</p>
                <p className="text-gray-500">{experiment.exp_created_at}</p>
            </div>

            <Status status={experiment.exp_status} size="small" />
        </div>
    );
};

export default ResearchExperimentCard;
