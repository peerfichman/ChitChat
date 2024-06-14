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
import EditablePageTitle from './../EditablePageTitle';
import { updateExperimentName } from '../../requests/experiments';

const Experiment = () => {
    let { id } = useParams();

    const [experiment, setExperiment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Agents, setAgents] = useState([]);
    const [experimentName, setExperimentName] = useState(null);

    useEffect(() => {
        getExperimentById(id)
            .then((data) => {
                const stringDate = getDateFormatted(data.exp.exp_crated_at);
                setExperiment({ ...data.exp, exp_created_at: stringDate });
                setExperimentName(data.exp.exp_name);
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
            <div className="my-20 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm lg:min-w-[590px]">
                <div className="flex flex-col gap-2">
                    {/* <PageTitle marginY="">{experiment.exp_name}</PageTitle> */}
                    <EditablePageTitle
                        title={experimentName}
                        setTitle={(val) => {
                            setExperimentName(val);
                            updateExperimentName(id, val);
                        }}
                    />
                    <p className="opacity-55">Experiment</p>
                </div>
                <Status status={experiment.exp_status} />
                <div className="w-full">
                    <ExperimentDetails
                        experiment={experiment}
                        setExperiment={setExperiment}
                        agentsLength={Agents.length}
                    />
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
