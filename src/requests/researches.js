import axios from 'axios';

const baseURL = process.env.REACT_APP_CHICHAT_API_URL + 'api/' + 'studies';

const getAllResearches = async () => {
    try {
        const response = await axios.get(baseURL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const getResearchById = async (id) => {
    try {
        const response = await axios.get(baseURL + `/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const createResearch = async (study) => {
    try {
        const response = await axios.post(baseURL, study, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create study', error);
        return null;
    }
};

const getAllExperimentsOfResearch = async (id) => {
    try {
        const response = await axios.get(baseURL + `/experiments/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch experiments', error);
        return null;
    }
};

const updateResearchPrompt = async (study_id, prompt) => {
    try {
        const response = await axios.put(
            baseURL,
            {
                study_id,
                study_prompt: prompt,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update study prompt', error);
        return null;
    }
};

const updateResearchDescription = async (study_id, description) => {
    try {
        const response = await axios.put(
            baseURL,
            {
                study_id,
                study_description: description,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update research description', error);
        return null;
    }
};

const updateResearchSubject = async (study_id, newSubject) => {
    try {
        const response = await axios.put(
            baseURL,
            {
                study_id,
                study_subject: newSubject,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update research subject', error);
        return null;
    }
};

const updateResearchName = async (study_id, newName) => {
    try {
        const response = await axios.put(
            baseURL,
            {
                study_id,
                study_name: newName,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update research name', error);
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
    updateResearchSubject,
    updateResearchName
};
