import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';
const ExperimentCard = ({ experiment }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col bg-gray-50 hover:bg-gray-200 border shadow-sm rounded-xl p-4 w-[300px] gap-3  cursor-pointer"
            onClick={() => navigate(`/experiment/${experiment.id}`)}>
            <h3 className="text-lg font-bold text-gray-800 ">
                {experiment.name} #{experiment.id}
            </h3>
            <Status status={experiment.status} size="small" />

            <p className="mt-2 text-gray-500 ">{experiment.subject}</p>
        </div>
    );
};
export default ExperimentCard;
