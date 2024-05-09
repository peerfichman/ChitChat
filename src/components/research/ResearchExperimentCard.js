import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';

const ResearchExperimentCard = ({
    experiment,
    navigateTo = `/experiments/${experiment.exp_id}`,
}) => {
    const navigate = useNavigate();
    console.log('experiment', experiment);
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
            <div className="flex gap-1">
                <p className="font-bold text-gray-500">Maximum Participants:</p>
                <p className="text-gray-500">
                    {experiment.exp_num_participants}
                </p>
            </div>
            <div className="flex gap-1">
                <p className="font-bold text-gray-500">Created At:</p>
                <p className="text-gray-500">{experiment.exp_created_at}</p>
            </div>

            <Status status={experiment.exp_status} size="small" />
        </div>
    );
};

export default ResearchExperimentCard;
