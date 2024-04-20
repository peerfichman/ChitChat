import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';
const ExperimentCard = ({ experiment }) => {
    const navigate = useNavigate();
    const date = new Date(experiment.exp_created_at);
    const stringDate =
        String(date.getDate()) +
        '/' +
        String(date.getMonth() + 1) +
        '/' +
        String(date.getFullYear());
    return (
        <div
            className="flex flex-col items-center bg-gray-50 hover:bg-gray-200 border shadow-md rounded-xl p-4 w-[300px] gap-3 cursor-pointer"
            onClick={() => navigate(`/experiments/${experiment.exp_id}`)}>
            <p className="text-2xl font-bold text-gray-800 truncate w-11/12 text-center">
                {experiment.exp_name}
            </p>
            <p className="text-gray-500">{stringDate}</p>
            <Status status={experiment.exp_status} size="small" />
        </div>
    );
};
export default ExperimentCard;
