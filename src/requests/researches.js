import axios from 'axios';

const baseURL = process.env.REACT_APP_CHICHAT_API_URL + 'studies';

const getAllResearches = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const getResearchById = async (id) => {
    try {
        const response = await axios.get(baseURL + `/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const createResearch = async (study) => {
    try {
        const response = await axios.post(baseURL, study);
        return response.data;
    } catch (error) {
        console.error('Failed to create study', error);
        return null;
    }
};

const getAllExperimentsOfResearch = async (id) => {
    try {
        const response = await axios.get(baseURL + `/experiments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const updateResearchPrompt = async (study_id, prompt) => {
    try {
        const response = await axios.put(baseURL, {
            study_id,
            study_prompt: prompt,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update study prompt', error);
        return null;
    }
};

const updateResearchDescription = async (study_id, description) => {
    try {
        const response = await axios.put(baseURL, {
            study_id,
            study_description: description,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update study description', error);
        return null;
    }
};

export {
    getAllResearches,
    getResearchById,
    createResearch,
    getAllExperimentsOfResearch,
    updateResearchPrompt,
    updateResearchDescription,
};
