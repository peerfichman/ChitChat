import React, { useState } from 'react';
import AllItemsBlock from '../AllItemsBlock';
import { ExperimentVariables } from '../../constants/experimentsConstants';
import ExperimentCard from './ExperimentCard';

const Experiments = ({ experiments }) => {
    const [filteredExperiments, setFilteredExperiments] = useState(experiments);

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
    return (
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
            filterComponent={{
                onclick: handleFilter,
            }}
            totalItems={experiments.length + ' Experiments'}>
            {filteredExperiments.map((experiment) => (
                <ExperimentCard
                    key={experiment.exp_id}
                    experiment={experiment}
                />
            ))}
        </AllItemsBlock>
    );
};

export default Experiments;
