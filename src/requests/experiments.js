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
        return response.data[0];
    } catch (error) {
        console.error('Failed to fetch experiment', error);
        return null;
    }
};

const updateExperimentStatus = async (experiment, status) => {
    const newExperiment = { ...experiment, exp_status: status };
    const URL = baseURL + `experiments`;
    try {
        const response = await axios.put(URL, newExperiment);
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment status', error);
        return null;
    }
};

const createExperiment = async (experiment) => {
    const URL = baseURL + 'experiments';
    try {
        const response = await axios.post(URL, {
            exp_subject: experiment.expSubject,
            exp_prompt: experiment.expPrompt,
            exp_name: experiment.expName,
            exp_status: statusOptions.NOT_STARTED,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create experiment', error);
        return null;
    }
};

const createAgent = async (agent, experimentID) => {
    const URL = baseURL + 'agents';
    try {
        const response = await axios.post(URL, {
            agent_name: agent.name,
            agent_sentiment: agent.sentiment,
            agent_eng: 0.25,
            exp_id: experimentID,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create agent', error);
        return null;
    }
};

export {
    getAllExperiments,
    getExperimentById,
    updateExperimentStatus,
    createExperiment,
    createAgent,
};
