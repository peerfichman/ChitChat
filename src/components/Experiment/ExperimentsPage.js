import React, { useEffect } from 'react';
import ExperimentCard from './ExperimentCard';
import { useState } from 'react';
import { getAllExperiments } from '../../requests/experiments';
import { useNavigate } from 'react-router';
import Loading from '../Loading';
import SortComponent from './SortComponent';
import FilterComponent from './FilterComponent';

const ExperimentsPage = () => {
    const [experiments, setExperiments] = useState([]);
    const [filteredExperiments, setFilteredExperiments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllExperiments()
            .then((data) => {
                const newExperiments = data.map((experiment) => {
                    const date = new Date(experiment.exp_created_at);
                    const stringDate =
                        String(date.getDate()) +
                        '/' +
                        String(date.getMonth() + 1) +
                        '/' +
                        String(date.getFullYear());
                    return { ...experiment, exp_created_at: stringDate };
                });
                setExperiments(newExperiments);
                setFilteredExperiments(newExperiments);
            })
            .catch((error) => {
                console.error('Failed to fetch experiments', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const search = e.target.value;
        const filtered = experiments.filter((experiment) => {
            return experiment.exp_name
                .toLowerCase()
                .includes(search.toLowerCase());
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

    if (loading) {
        return <Loading />;
    }

    return filteredExperiments ? (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-100 gap-3">
            <h1 className="mb-3 mt-5 text-5xl font-bold text-black">
                Experiments
            </h1>
            <div className="w-full flex items-center justify-center mb-3">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm px-3 rounded h-12"
                    onClick={() => navigate('/experiment')}>
                    Add Experiment
                </button>
            </div>
            <div className="">
                <div className="min-w-[916px] flex items-center justify-between mb-3">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-1/3 h-12 rounded border border-gray-300 px-3 cursor-text"
                        onChange={handleSearch}
                    />
                    <div className="flex gap-2">
                        <SortComponent handleSort={handleSort} />
                        <FilterComponent handleFilter={handleFilter} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {filteredExperiments.map((experiment) => (
                        <ExperimentCard
                            key={experiment.exp_id}
                            experiment={experiment}
                        />
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div>Experiments not found</div>
    );
};
export default ExperimentsPage;
