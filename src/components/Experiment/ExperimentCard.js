import React from 'react';
import { useNavigate } from 'react-router';
import Status from '../Status';
import CardDetailObject from './../CardDetailObject';
const ExperimentCard = ({
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
            <CardDetailObject title="Research" value={experiment.study_name} />
            <CardDetailObject
                title="Created At"
                value={experiment.exp_created_at}
            />
            {experiment.simultaneous_responses ? (
                <CardDetailObject
                    title="Agents Response"
                    value={'Simultaneously'}
                />
            ) : (
                <CardDetailObject
                    title="Agents Response"
                    value={'Individually'}
                />
            )}

            <Status status={experiment.exp_status} size="small" />
        </div>
    );
};
export default ExperimentCard;
