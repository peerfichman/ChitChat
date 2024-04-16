import axios from 'axios';
const baseURL = process.env.REACT_APP_CHICHAT_API_URL;

const createAgent = async (agent, experimentID) => {
    const URL = baseURL + 'agents';
    try {
        const response = await axios.post(URL, {
            agent_name: agent.name,
            agent_sentiment: agent.sentiment,
            agent_eng: agent.agent_eng,
            exp_id: experimentID,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create agent', error);
        return null;
    }
};

const getAllAgents = async (id) => {
    const URL = baseURL + `agents/${id}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch agents', error);
        return null;
    }
};

export { createAgent, getAllAgents };
