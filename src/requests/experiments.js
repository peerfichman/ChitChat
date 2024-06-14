import axios from 'axios';
import { statusOptions } from '../constants/experimentsConstants';
const baseURL = process.env.REACT_APP_CHICHAT_API_URL + 'api/';

const getAllExperiments = async () => {
    const URL = baseURL + 'experiments';
    try {
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const getExperimentById = async (id) => {
    const URL = baseURL + `experiments/${id}`;
    try {
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiment', error);
        return null;
    }
};

const createExperiment = async (experiment, agents, study_id) => {
    const URL = baseURL + 'experiments';
    try {
        const response = await axios.post(
            URL,
            {
                exp: {
                    exp_subject: experiment.expSubject,
                    exp_provoking_prompt: experiment.expPrompt,
                    exp_name: experiment.expName,
                    exp_status: statusOptions.NOT_STARTED,
                    exp_num_participants: experiment.exp_num_participants,
                    simultaneous_responses: experiment.simultaneous_responses,
                    study_id,
                },
                agents,
            },
            { withCredentials: true },
        );

        return response.data;
    } catch (error) {
        console.error('Failed to create experiment', error);
        return null;
    }
};

const updateExperimentStatus = async (exp_id, exp_status) => {
    const newExperiment = { exp_id, exp_status };
    const URL = baseURL + `experiments/status`;
    try {
        const response = await axios.put(URL, newExperiment, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment status', error);
        return null;
    }
};

const updateExperimentPrompt = async (exp_id, prompt) => {
    const URL = baseURL + `experiments`;
    try {
        const response = await axios.put(
            URL,
            {
                exp_id,
                exp_provoking_prompt: prompt,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment prompt', error);
        return null;
    }
};

const updateExperimentSubject = async (exp_id, newSub) => {
    const URL = baseURL + `experiments`;
    try {
        const response = await axios.put(
            URL,
            {
                exp_id,
                exp_subject: newSub,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment subject', error);
        return null;
    }
};

const updateSimultaneousResponses = async (exp_id, newResponse) => {
    const URL = baseURL + `experiments`;
    try {
        const response = await axios.put(
            URL,
            {
                exp_id,
                simultaneous_responses: newResponse,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error(
            'Failed to update experiment simultaneous responses',
            error,
        );
        return null;
    }
};

const updateExperimentName = async (exp_id, newName) => {
    const URL = baseURL + `experiments`;
    try {
        const response = await axios.put(
            URL,
            {
                exp_id,
                exp_name: newName,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment name', error);
        return null;
    }
};

export {
    getAllExperiments,
    getExperimentById,
    createExperiment,
    updateExperimentStatus,
    updateExperimentPrompt,
    updateExperimentSubject,
    updateSimultaneousResponses,
    updateExperimentName,
};
