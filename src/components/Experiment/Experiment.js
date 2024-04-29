import React from 'react';
import { useParams } from 'react-router-dom';
import Status from '../Status';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import {
    getExperimentById,
    updateExperimentStatus,
} from '../../requests/experiments';
import ExperimentDetails from './ExperimentDetails';
import ChangeStatusButton from '../ChangeStatusButton';
import AgentsBlock from '../agent/AgentsBlock';
import PageTitle from '../PageTitle';

const Experiment = () => {
    let { id } = useParams();

    const [experiment, setExperiment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Agents, setAgents] = useState([]);

    useEffect(() => {
        getExperimentById(id)
            .then((data) => {
                const date = new Date(data.exp.exp_crated_at);
                const stringDate =
                    String(date.getDate()) +
                    '/' +
                    String(date.getMonth() + 1) +
                    '/' +
                    String(date.getFullYear());

                setExperiment({ ...data.exp, exp_created_at: stringDate });
                setAgents(data.agents);
            })
            .catch((error) => {
                console.error('Failed to fetch experiment', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, loading]);

    if (loading) {
        return <Loading />;
    }

    const ChangeExperimentStatus = (status) => {
        setExperiment({ ...experiment, exp_status: status });
        updateExperimentStatus(experiment.exp_id, status);
    };

    return experiment ? (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-100">
            <div className="flex flex-col shadow-sm rounded-xl p-4 bg-white my-20 min-w-[990px] gap-4">
                <PageTitle marginY="">{experiment.exp_name}</PageTitle>
                <Status status={experiment.exp_status} />
                <div className="w-full">
                    <ExperimentDetails experiment={experiment} />
                </div>
                <AgentsBlock agents={Agents} />
                <div className="flex justify-end">
                    <ChangeStatusButton
                        status={experiment.exp_status}
                        setStatus={ChangeExperimentStatus}
                        experiment={experiment}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div>Experiment not found</div>
    );
};
export default Experiment;
