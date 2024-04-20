import React from 'react';
import { useParams } from 'react-router-dom';
import Status from '../Status';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import {
    getExperimentById,
    updateExperimentStatus,
} from '../../requests/experiments';
import { getAllAgents } from '../../requests/agents';
import ExperimentDetails from './ExperimentDetails';
import ChangeStatusButton from '../ChangeStatusButton';
import AgentsBlock from './AgentsBlock';
import LoadingAgents from '../agent/LoadingAgents';
const Experiment = () => {
    let { id } = useParams();

    const [experiment, setExperiment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Agents, setAgents] = useState([]);
    const [loadingAgents, setLoadingAgents] = useState(true);

    useEffect(() => {
        getExperimentById(id)
            .then((data) => {
                const date = new Date(data.exp_created_at);
                const stringDate =
                    String(date.getDate()) +
                    '/' +
                    String(date.getMonth() + 1) +
                    '/' +
                    String(date.getFullYear());

                setExperiment({ ...data, exp_created_at: stringDate });
            })
            .catch((error) => {
                console.error('Failed to fetch experiment', error);
            })
            .finally(() => {
                setLoading(false);
                getAllAgents(id)
                    .then((data) => setAgents(data))
                    .catch((error) => {
                        console.error('Failed to fetch agents', error);
                    })
                    .finally(() => {
                        setLoadingAgents(false);
                    });
            });
    }, [id, loading]);

    if (loading) {
        return <Loading />;
    }

    const ChangeExperimentStatus = (status) => {
        setExperiment({ ...experiment, exp_status: status });
        updateExperimentStatus(experiment, status);
    };

    return experiment ? (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-100">
            <div className="flex flex-col shadow-sm rounded-xl p-4 bg-white mt-20 min-w-[600px] gap-4">
                <h1 className="font-bold text-gray-800 text-5xl">
                    {experiment.exp_name}
                </h1>
                <Status status={experiment.exp_status} />
                <div className="w-full">
                    <ExperimentDetails experiment={experiment} />
                </div>
                {loadingAgents ? (
                    <LoadingAgents />
                ) : (
                    <AgentsBlock agents={Agents} />
                )}
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
