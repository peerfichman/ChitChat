import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';
const ExperimentCard = ({ experiment }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col items-center bg-gray-50 hover:bg-gray-200 border shadow-sm rounded-xl p-4 w-[300px] gap-3  cursor-pointer"
            onClick={() => navigate(`/experiments/${experiment.exp_id}`)}>
            <h3 className="text-2xl font-bold text-gray-800 ">
                {experiment.exp_subject}
            </h3>
            <Status status={experiment.exp_status} size="small" />
        </div>
    );
};
export default ExperimentCard;
