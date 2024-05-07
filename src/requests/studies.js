import axios from 'axios';

const baseURL = process.env.REACT_APP_CHICHAT_API_URL + 'studies';

const getAllStudies = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const getStudyById = async (id) => {
    try {
        const response = await axios.get(baseURL + `/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const createStudy = async (study) => {
    try {
        const response = await axios.post(baseURL, study);
        return response.data;
    } catch (error) {
        console.error('Failed to create study', error);
        return null;
    }
};

const getAllExperimentsOfStudy = async (id) => {
    try {
        const response = await axios.get(baseURL + `/experiments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};
export { getAllStudies, getStudyById, createStudy, getAllExperimentsOfStudy };
