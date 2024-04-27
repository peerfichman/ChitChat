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

const getAllAgents = async (experiment_id) => {
    const URL = baseURL + `agents/${experiment_id}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch agents', error);
        return null;
    }
};

export { createAgent, getAllAgents };
