import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStudyById } from '../../requests/studies';
import Loading from '../Loading';
import PageTitle from './../PageTitle';
import StudyDetails from './StudyDetails';
import { useNavigate } from 'react-router';
import StudyExperimentsBlock from './StudyExperimentsBlock';

const Study = () => {
    let { id } = useParams();

    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [experiments, setExperiments] = useState([
        {
            exp_crated_at: '2024-04-30T10:23:54.897224',
            exp_created_at: '30/4/2024',
            exp_id: '1',
            exp_messages_col_id: '28d12162-bb42-473f-ba08-a081f41425f5',
            exp_name: 'Gun Lisence1',
            exp_provoking_prompt:
                "I don't understand why anyone would oppose stricter gun license regulations when it's clear that easy access to firearms leads to increased violence and tragedy.",
            exp_status: 'Not Started',
            exp_subject: 'Gun Lisence',
        },
        {
            exp_crated_at: '2024-04-30T10:23:54.897224',
            exp_created_at: '30/4/2024',
            exp_id: '2',
            exp_messages_col_id: '28d12162-bb42-473f-ba08-a081f41425f5',
            exp_name: 'Gun Lisence2',
            exp_provoking_prompt:
                "I don't understand why anyone would oppose stricter gun license regulations when it's clear that easy access to firearms leads to increased violence and tragedy.",
            exp_status: 'Running',
            exp_subject: 'Gun Lisence',
        },
        {
            exp_crated_at: '2024-04-30T10:23:54.897224',
            exp_created_at: '30/4/2024',
            exp_id: '3',
            exp_messages_col_id: '28d12162-bb42-473f-ba08-a081f41425f5',
            exp_name: 'Gun Lisence3',
            exp_provoking_prompt:
                "I don't understand why anyone would oppose stricter gun license regulations when it's clear that easy access to firearms leads to increased violence and tragedy.",
            exp_status: 'Completed',
            exp_subject: 'Gun Lisence',
        },
        {
            exp_crated_at: '2024-04-30T10:23:54.897224',
            exp_created_at: '30/4/2024',
            exp_id: '4',
            exp_messages_col_id: '28d12162-bb42-473f-ba08-a081f41425f5',
            exp_name: 'Gun Lisence4',
            exp_provoking_prompt:
                "I don't understand why anyone would oppose stricter gun license regulations when it's clear that easy access to firearms leads to increased violence and tragedy.",
            exp_status: 'Completed',
            exp_subject: 'Gun Lisence',
        },
        {
            exp_crated_at: '2024-04-30T10:23:54.897224',
            exp_created_at: '30/4/2024',
            exp_id: 'eeccb6a3-6fb0-497e-95c7-b0855bc62df1',
            exp_messages_col_id: '28d12162-bb42-473f-ba08-a081f41425f5',
            exp_name: 'Gun Lisence5',
            exp_provoking_prompt:
                "I don't understand why anyone would oppose stricter gun license regulations when it's clear that easy access to firearms leads to increased violence and tragedy.",
            exp_status: 'Completed',
            exp_subject: 'Gun Lisence',
        },
    ]); // [1]
    const navigate = useNavigate();

    useEffect(() => {
        getStudyById(id)
            .then((data) => {
                setStudy(data);
            })
            .catch((error) => {
                console.error('Failed to fetch experiment', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return study ? (
        <div className="my-10 flex min-h-screen w-full flex-col items-center bg-slate-100">
            <div className=" flex min-w-[990px] flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
                <PageTitle marginY="">{study.study_name}</PageTitle>
                <div className="w-full">
                    <StudyDetails study={study} />
                </div>
                <StudyExperimentsBlock experiments={experiments} />
                <div className="flex h-20 items-center justify-end">
                    <button
                        onClick={() => navigate(`/experiment/${id}`)}
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

export default Study;
