import React, { useEffect, useState } from 'react';
import { getAllExperiments } from '../../requests/experiments';
import { useNavigate } from 'react-router';
import Loading from '../Loading';
import PageTitle from '../PageTitle';
import { getDateFormatted } from '../../utils';
import ExperimentSearchBar from './ExperimentSearchBar';

const ExperimentsPage = () => {
    const [experiments, setExperiments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllExperiments()
            .then((data) => {
                const newExperiments = data.map((experiment) => {
                    const stringDate = getDateFormatted(
                        experiment.exp_created_at,
                    );
                    return { ...experiment, exp_created_at: stringDate };
                });
                setExperiments(newExperiments);
            })
            .catch((error) => {
                console.error('Failed to fetch experiments', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return experiments ? (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Experiments</PageTitle>
            <div className="mb-3 flex w-full items-center justify-center">
                <button
                    onClick={() => navigate('/experiment')}
                    className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                    Add Experiment
                </button>
            </div>
            <ExperimentSearchBar experiments={experiments} />
        </div>
    ) : (
        <div>Experiments not found</div>
    );
};
export default ExperimentsPage;
