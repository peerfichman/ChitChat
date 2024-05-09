import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getResearchById,
    getAllExperimentsOfResearch,
} from '../../requests/researches';
import Loading from '../Loading';
import PageTitle from '../PageTitle';
import ResearchDetails from './ResearchDetails';
import { useNavigate } from 'react-router';
import ResearchExperimentsBlock from './ResearchExperimentsBlock';
import { getDateFormatted } from '../../utils';

const Research = () => {
    let { id } = useParams();

    const [research, setResearch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [experiments, setExperiments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getResearchById(id)
            .then((data) => {
                const stringDate = getDateFormatted(data.study_created_at);
                setResearch({ ...data, study_created_at: stringDate });
            })
            .catch((error) => {
                console.error('Failed to fetch research', error);
            })
            .finally(() => {
                getAllExperimentsOfResearch(id)
                    .then((data) => {
                        const newExperiments = data.map((experiment) => {
                            const stringDate = getDateFormatted(
                                experiment.exp_created_at,
                            );
                            return {
                                ...experiment,
                                exp_created_at: stringDate,
                            };
                        });
                        setExperiments(newExperiments);
                    })
                    .catch((error) => {
                        console.error('Failed to fetch experiments', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return research ? (
        <div className="my-10 flex min-h-screen w-full flex-col items-center bg-slate-100">
            <div className=" flex min-w-[990px] flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-2">
                    <PageTitle marginY="">{research.study_name}</PageTitle>
                    <p className="opacity-55">Research</p>
                </div>
                <div className="w-full">
                    <ResearchDetails study={research} />
                </div>
                <ResearchExperimentsBlock experiments={experiments} />
                <div className="flex h-20 items-center justify-end">
                    <button
                        onClick={() => navigate(`/research/${id}/experiment`)}
                        className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                        Add Experiment
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div>Study not found</div> //TODO: Add a better error message
    );
};

export default Research;
