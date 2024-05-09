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
import { getDateFormatted } from '../../utils';

const Experiment = () => {
    let { id } = useParams();

    const [experiment, setExperiment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Agents, setAgents] = useState([]);
    useEffect(() => {
        getExperimentById(id)
            .then((data) => {
                const stringDate = getDateFormatted(data.exp.exp_crated_at);
                setExperiment({ ...data.exp, exp_created_at: stringDate });
                setAgents(data.agents);
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

    const ChangeExperimentStatus = (status) => {
        setExperiment({ ...experiment, exp_status: status });
        updateExperimentStatus(experiment.exp_id, status);
    };

    return experiment ? (
        <div className="flex min-h-screen w-full flex-col items-center bg-slate-100">
            <div className="my-20 flex min-w-[990px] flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
                <PageTitle marginY="">{experiment.exp_name}</PageTitle>
                <Status status={experiment.exp_status} />
                <div className="w-full">
                    <ExperimentDetails experiment={experiment} />
                </div>
                <AgentsBlock agents={Agents} />
                <div className="flex h-20 items-center justify-end">
                    <ChangeStatusButton
                        status={experiment.exp_status}
                        setStatus={ChangeExperimentStatus}
                        experiment={experiment}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div>Experiment not found</div> //TODO: Add a better error message
    );
};
export default Experiment;
