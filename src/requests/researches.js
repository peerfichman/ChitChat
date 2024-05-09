import axios from 'axios';

const baseURL = process.env.REACT_APP_CHICHAT_API_URL + 'studies';

const getAllResearches = async () => {
    try {
        console.log('getAllResearches Request sent');
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
export {
    getAllResearches,
    getResearchById,
    createResearch,
    getAllExperimentsOfResearch,
};
