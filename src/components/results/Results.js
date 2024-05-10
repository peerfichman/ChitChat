import React, { useEffect, useState } from 'react';
import { getAllExperiments } from '../../requests/experiments';
import Loading from '../Loading';
import PageTitle from '../PageTitle';
import { getDateFormatted } from '../../utils';
import AllItemsBlock from './../AllItemsBlock';
import {
    ExperimentVariables,
    statusOptions,
} from '../../constants/experimentsConstants';
import ExperimentCard from '../Experiment/ExperimentCard';

const Results = () => {
    const [experiments, setExperiments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredExperiments, setFilteredExperiments] = useState(experiments);

    useEffect(() => {
        getAllExperiments()
            .then((data) => {
                const newExperiments = data.map((experiment) => {
                    const stringDate = getDateFormatted(
                        experiment.exp_created_at,
                    );
                    return { ...experiment, exp_created_at: stringDate };
                });
                const completedExperiments = newExperiments.filter(
                    (experiment) =>
                        experiment.exp_status === statusOptions.COMPLETED,
                );
                setExperiments(completedExperiments);
                setFilteredExperiments(completedExperiments);
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

    const handleSearch = (e) => {
        const search = e.target.value;
        const filtered = experiments.filter((experiment) => {
            return (
                experiment.exp_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) |
                experiment.study_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );
        });
        setFilteredExperiments(filtered);
    };

    const handleSort = (isAscending, key) => {
        let sorted;
        if (isAscending) {
            sorted = [...filteredExperiments].sort((a, b) => {
                return a[key].localeCompare(b[key]);
            });
        } else {
            sorted = [...filteredExperiments].sort((a, b) => {
                return b[key].localeCompare(a[key]);
            });
        }
        setFilteredExperiments(sorted);
    };

    const handleFilter = (status = '') => {
        if (status) {
            const filtered = experiments.filter((experiment) => {
                return experiment.exp_status === status;
            });
            setFilteredExperiments(filtered);
        } else {
            setFilteredExperiments(experiments);
        }
    };

    return experiments ? (
        <div className="mb-16 flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Results</PageTitle>
            <AllItemsBlock
                handleSearch={handleSearch}
                sortComponent={{
                    onclick: handleSort,
                    attributes: {
                        name: ExperimentVariables.EXP_NAME,
                        date: ExperimentVariables.EXP_DATE,
                        research: ExperimentVariables.EXP_RESEARCH_NAME,
                    },
                }}
                totalItems={experiments.length + ' Results'}>
                {filteredExperiments.map((experiment) => (
                    <ExperimentCard
                        key={experiment.exp_id}
                        experiment={experiment}
                        navigateTo={`/experiment/metric/${experiment.exp_id}`}
                    />
                ))}
            </AllItemsBlock>
        </div>
    ) : (
        <div>Experiments not found</div>
    );
};
export default Results;
