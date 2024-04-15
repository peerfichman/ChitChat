import React, { useEffect } from 'react';
import ExperimentCard from './ExperimentCard';
import { useState } from 'react';
import { getAllExperiments } from '../../requests/experiments';
import { useNavigate } from 'react-router';

const ExperimentsPage = () => {
    const [experiments, setExperiments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllExperiments()
            .then((data) => setExperiments(data))
            .catch((error) => {
                console.error('Failed to fetch experiments', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading && !experiments) {
        return <div>Loading...</div>;
    }

    return experiments ? (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c] gap-3">
            <h1 className="mb-3 mt-5 text-5xl font-bold text-white">
                Experiments
            </h1>
            <div className="w-full flex items-center justify-center mb-3">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm px-3 rounded h-12"
                    onClick={() => navigate('/experiment')}>
                    Add Experiment
                </button>
            </div>
            <div className="grid grid-cols-3 h-8 gap-2">
                {experiments.map((experiment) => (
                    <ExperimentCard
                        key={experiment.exp_id}
                        experiment={experiment}
                    />
                ))}
            </div>
        </div>
    ) : (
        <div>Experiments not found</div>
    );
};
export default ExperimentsPage;
