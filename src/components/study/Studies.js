import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAllStudies } from '../../requests/studies';
import PageTitle from './../PageTitle';
import AllItemsBlock from './../AllItemsBlock';
import StudyCard from './StudyCard';
import { StudyVariables } from '../../constants/studiesConstants';
import { getDateFormatted } from '../../utils';
const Studies = () => {
    const [studies, setStudies] = useState([]);
    const [filteredStudies, setFilteredStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllStudies()
            .then((data) => {
                const studiesFormatted = data.map((study) => {
                    const stringDate = getDateFormatted(study.study_created_at);
                    return { ...study, study_created_at: stringDate };
                });
                console.log(data);
                setStudies(studiesFormatted);
                setFilteredStudies(studiesFormatted);
            })
            .catch((error) => {
                console.error('Failed to fetch studies', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const search = e.target.value;
        const filtered = studies.filter((study) => {
            return study.study_name
                .toLowerCase()
                .includes(search.toLowerCase());
        });
        setFilteredStudies(filtered);
    };

    const handleSort = (isAscending, key) => {
        let sorted;
        if (isAscending) {
            sorted = [...filteredStudies].sort((a, b) => {
                return a[key].localeCompare(b[key]);
            });
        } else {
            sorted = [...filteredStudies].sort((a, b) => {
                return b[key].localeCompare(a[key]);
            });
        }
        setFilteredStudies(sorted);
    };

    // const handleFilter = (status = '') => {
    //     if (status) {
    //         const filtered = studies.filter((study) => {
    //             return study.exp_status === status;
    //         });
    //         setFilteredExperiments(filtered);
    //     } else {
    //         setFilteredExperiments(experiments);
    //     }
    // };
    return filteredStudies ? (
        <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Studies</PageTitle>
            <div className="mb-3 flex w-full items-center justify-center">
                <button
                    onClick={() => navigate('/study')}
                    className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                    Add Study
                </button>
            </div>
            <AllItemsBlock
                handleSearch={handleSearch}
                sortComponent={{
                    onclick: handleSort,
                    attributes: {
                        name: StudyVariables.STUDY_NAME,
                        date: StudyVariables.STUDY_DATE,
                    },
                }}>
                {filteredStudies.map((study) => (
                    <StudyCard key={study.study_id} study={study} />
                ))}
            </AllItemsBlock>{' '}
        </div>
    ) : (
        <div>Syudies not found</div>
    );
};

export default Studies;
