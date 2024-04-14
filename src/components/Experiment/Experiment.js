import React from 'react';
import { useParams } from 'react-router-dom';
import Status from '../Status';
// we will get the experiment from the api call not from props
import { useNavigate } from 'react-router';

const Experiment = ({ experiments }) => {
    let { id } = useParams();

    const navigate = useNavigate();

    const onClickNext = () => {
        id = (parseInt(id) + 1) % experiments.length;
        navigate(`/experiment/${parseInt(id)}`);
    };

    const onClickPrev = () => {
        id = parseInt(id) - 1;
        if (parseInt(id) < 0) {
            id = experiments.length - 1;
        }
        navigate(`/experiment/${parseInt(id)}`);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c] gap-3 ">
            <button
                className="absolute top-5 left-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                onClick={() => navigate('/experiment')}>
                Back
            </button>
            <div className="flex flex-row gap-5 mt-20 border bg-white p-4 ">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                    onClick={() => onClickPrev()}>
                    prev
                </button>
                <div className="flex flex-col shadow-sm rounded-xl p-4 gap-3">
                    <h1 className="font-bold text-gray-800 text-5xl">
                        {experiments[id].name}
                    </h1>
                    <p className="mt-2 text-xs font-medium uppercase text-gray-500">
                        <Status status={experiments[id].status} />
                    </p>
                    <p className="mt-2 text-3xl font-medium uppercase text-gray-500">
                        #{experiments[id].id}
                    </p>
                    <p className="mt-4 text-gray-500 ">
                        {experiments[id].subject}
                    </p>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                    onClick={() => onClickNext()}>
                    Next
                </button>
            </div>
        </div>
    );
};
export default Experiment;
