import axios from 'axios';
import { statusOptions } from './constant';
import {collection} from "firebase/firestore";
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
    const newExperiment = {
        exp_id: experiment.exp_id,
        exp_provoking_prompt: experiment.exp_provoking_prompt,
        exp_status: status,
        exp_subject: experiment.exp_subject,
    };
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

const getNeo4jGraph = async(collectionId) => {
    const URL = `http://localhost:3001/api/sna/get/${collectionId}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch metric', error);
        return null;
    }
}

const getCSV = async (collectionId, experimentName) => {
    const URL = `http://localhost:3001/api/sna/get/${collectionId}/name/${experimentName}`;
    try {
        const response = await axios.get(URL, { responseType: 'blob' });
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${experimentName}.csv`);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        link.remove();
    } catch (error) {
        console.error('Failed to fetch metric', error);
    }
}

export {
    getAllExperiments,
    getExperimentById,
    updateExperimentStatus,
    createExperiment,
    createAgent,
    getCSV,
    getNeo4jGraph
};
