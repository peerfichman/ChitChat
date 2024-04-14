import React from 'react';
import ExperimentCard from './ExperimentCard';

const ExperimentsPage = ({ experiments }) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c] gap-3">
            <h1 className="mb-3 mt-5 text-4xl font-bold text-white">
                Experiments
            </h1>
            <div className="grid grid-cols-3 h-8 gap-2">
                {experiments.map((experiment) => (
                    <ExperimentCard
                        key={experiment.id}
                        experiment={experiment}
                    />
                ))}
            </div>
        </div>
    );
};
export default ExperimentsPage;
