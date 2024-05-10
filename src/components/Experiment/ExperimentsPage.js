import React, { useEffect, useState } from 'react';
import { getAllExperiments } from '../../requests/experiments';
import Loading from '../Loading';
import PageTitle from '../PageTitle';
import { getDateFormatted } from '../../utils';
import Experiments from './Experiments';

const ExperimentsPage = () => {
    const [experiments, setExperiments] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="mb-16 flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Experiments</PageTitle>
            <Experiments experiments={experiments} />
        </div>
    ) : (
        <div>Experiments not found</div>
    );
};
export default ExperimentsPage;
