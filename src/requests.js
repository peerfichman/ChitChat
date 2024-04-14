import axios from 'axios';

const getAllExperiments = async () => {
    try {
        const URL = process.env.REACT_APP_CHICHAT_API_URL + 'experiments';
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
    }
};

const getExperimentById = async (id) => {
    try {
        const URL = process.env.REACT_APP_CHICHAT_API_URL + `experiments/${id}`;
        const response = await axios.get(URL);
        return response.data[0];
    } catch (error) {
        console.error('Failed to fetch experiment', error);
    }
};

const updateExperimentStatus = async (experiment, status) => {
    const newExperiment = {
        exp_id: experiment.exp_id,
        exp_provoking_prompt: experiment.exp_provoking_prompt,
        exp_status: status,
        exp_subject: experiment.exp_subject,
    };
    try {
        const URL = process.env.REACT_APP_CHICHAT_API_URL + `experiments`;
        const response = await axios.put(URL, newExperiment);
        return response.data;
    } catch (error) {
        console.error('Failed to update experiment status', error);
    }
};

export { getAllExperiments, getExperimentById, updateExperimentStatus };
