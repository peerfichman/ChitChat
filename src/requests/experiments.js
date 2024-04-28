import axios from 'axios';
import { statusOptions } from '../constant';
const baseURL = process.env.REACT_APP_CHICHAT_API_URL;

const getAllExperiments = async () => {
    const URL = baseURL + 'experiments';
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const getExperimentById = async (id) => {
    const URL = baseURL + `experiments/${id}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiment', error);
        return null;
    }
};

const updateExperimentStatus = async (exp_id, exp_status) => {
    const newExperiment = { exp_id, exp_status };
    const URL = baseURL + `experiments/status`;
    try {
        const response = await axios.put(URL, newExperiment);
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment status', error);
        return null;
    }
};

const createExperiment = async (experiment, agents) => {
    const URL = baseURL + 'experiments';
    try {
        const response = await axios.post(URL, {
            exp: {
                exp_subject: experiment.expSubject,
                exp_provoking_prompt: experiment.expPrompt,
                exp_name: experiment.expName,
                exp_status: statusOptions.NOT_STARTED,
            },
            agents,
        });

        return response.data;
    } catch (error) {
        console.error('Failed to create experiment', error);
        return null;
    }
};

export {
    getAllExperiments,
    getExperimentById,
    updateExperimentStatus,
    createExperiment,
};
