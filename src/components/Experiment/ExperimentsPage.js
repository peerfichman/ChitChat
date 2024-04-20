import React, { useEffect } from 'react';
import ExperimentCard from './ExperimentCard';
import { useState } from 'react';
import { getAllExperiments } from '../../requests/experiments';
import { useNavigate } from 'react-router';
import Loading from '../Loading';
import { GrFilter } from 'react-icons/gr';
import { BiSortAlt2 } from 'react-icons/bi';
import OverlayDropDown from '../OverlayDropDown';

const ExperimentsPage = () => {
    const [experiments, setExperiments] = useState([]);
    const [filteredExperiments, setFilteredExperiments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('fetching experiments');
        getAllExperiments()
            .then((data) => {
                setExperiments(data);
                setFilteredExperiments(data);
            })
            .catch((error) => {
                console.error('Failed to fetch experiments', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        console.log(e.target.value);
        const search = e.target.value;
        const filtered = experiments.filter((experiment) => {
            return experiment.exp_name
                .toLowerCase()
                .includes(search.toLowerCase());
        });
        setFilteredExperiments(filtered);
    };

    const handleSort = (isAscending) => {
        let sorted;
        if (isAscending) {
            sorted = [...filteredExperiments].sort((a, b) => {
                return a.exp_name.localeCompare(b.exp_name);
            });
        } else {
            sorted = [...filteredExperiments].sort((a, b) => {
                return b.exp_name.localeCompare(a.exp_name);
            });
        }
        setFilteredExperiments(sorted);
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
            <div>
                <div className="w-full flex items-center justify-between mb-3">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-1/3 h-12 rounded border border-gray-300 px-3 cursor-text"
                        onChange={handleSearch}
                    />
                    <div className="flex gap-2">
                        <OverlayDropDown Icon={BiSortAlt2}>
                            <div
                                className="hover:bg-slate-200 px-2 py-1"
                                onClick={() => handleSort(true)}>
                                A-Z
                            </div>
                            <div
                                className="hover:bg-slate-200 px-2 py-1"
                                onClick={() => handleSort(false)}>
                                Z-A
                            </div>
                        </OverlayDropDown>
                        <OverlayDropDown Icon={GrFilter}>
                            <button>Option 1</button>
                            <button>Option 2</button>
                            <button>Option 3</button>
                        </OverlayDropDown>
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
