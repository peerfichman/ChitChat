import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAllResearches } from '../../requests/researches';
import PageTitle from '../PageTitle';
import AllItemsBlock from '../AllItemsBlock';
import ResearchCard from './ResearchCard';
import { ResearchVariables } from '../../constants/studiesConstants';
import { getDateFormatted } from '../../utils';

const Researches = () => {
    const [researches, setResearches] = React.useState([]);
    const [filteredResearches, setFilteredResearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        getAllResearches()
            .then((data) => {
                console.log(data);
                const researchesFormatted = data.map((research) => {
                    const stringDate = getDateFormatted(
                        research.study_created_at,
                    );
                    return { ...research, study_created_at: stringDate };
                });
                setResearches(researchesFormatted);
                setFilteredResearches(researchesFormatted);
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
        const filtered = researches.filter((research) => {
            return research.study_name
                .toLowerCase()
                .includes(search.toLowerCase());
        });
        setFilteredResearches(filtered);
    };

    const handleSort = (isAscending, key) => {
        let sorted;
        if (isAscending) {
            sorted = [...filteredResearches].sort((a, b) => {
                return a[key].localeCompare(b[key]);
            });
        } else {
            sorted = [...filteredResearches].sort((a, b) => {
                return b[key].localeCompare(a[key]);
            });
        }
        setFilteredResearches(sorted);
    };
    console.log('filtered: ', filteredResearches);
    return filteredResearches ? (
        <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Researches</PageTitle>
            <div className="mb-3 flex w-full items-center justify-center">
                <button
                    onClick={() => navigate('/research')}
                    className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                    Add Research
                </button>
            </div>
            <AllItemsBlock
                handleSearch={handleSearch}
                sortComponent={{
                    onclick: handleSort,
                    attributes: {
                        name: ResearchVariables.STUDY_NAME,
                        date: ResearchVariables.STUDY_DATE,
                    },
                }}
                totalItems={researches.length + ' Researches'}>
                {filteredResearches.map((research) => (
                    <ResearchCard key={research.study_id} research={research} />
                ))}
            </AllItemsBlock>
        </div>
    ) : (
        <div>Syudies not found</div>
    );
};

export default Researches;
