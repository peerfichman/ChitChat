import AllItemsBlock from './../AllItemsBlock';
import { useState } from 'react';
import { ExperimentVariables } from '../../constants/experimentsConstants';
import ResearchExperimentCard from './ResearchExperimentCard';
const ResearchExperimentsBlock = ({ experiments }) => {
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
        <div className="flex flex-col gap-2">
            <div className="mb-2 flex w-fit items-center">
                <p className="h-fit align-middle text-3xl font-bold">
                    Experiments
                </p>
            </div>
            <AllItemsBlock
                handleSearch={handleSearch}
                sortComponent={{
                    onclick: handleSort,
                    attributes: {
                        name: ExperimentVariables.EXP_NAME,
                        date: ExperimentVariables.EXP_DATE,
                    },
                }}
                filterComponent={{
                    onclick: handleFilter,
                }}
                totalItems={experiments.length + ' Experiments'}>
                {filteredExperiments.map((experiment) => (
                    <ResearchExperimentCard
                        key={experiment.exp_id}
                        experiment={experiment}
                    />
                ))}
            </AllItemsBlock>
        </div>
    );
};

export default ResearchExperimentsBlock;
