import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';
const ExperimentCard = ({ experiment }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex w-[300px] cursor-pointer flex-col items-center gap-3 rounded-xl border bg-gray-50 p-4  hover:bg-gray-200"
            onClick={() => navigate(`/experiments/${experiment.exp_id}`)}>
            <p className="w-11/12 truncate text-center text-2xl font-bold text-gray-800">
                {experiment.exp_name}
            </p>
            <p className="text-gray-500">{experiment.exp_created_at}</p>
            <Status status={experiment.exp_status} size="small" />
        </div>
    );
};
export default ExperimentCard;
