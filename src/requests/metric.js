import axios from 'axios';
const baseURL = process.env.REACT_APP_CHICHAT_API_URL;

const getNeo4jGraph = async (collectionId) => {
    const URL = `${baseURL}sna/get/${collectionId}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch metric', error);
        return null;
    }
};

const getCSV = async (collectionId, experimentName) => {
    const URL = `${baseURL}sna/get/${collectionId}/name/${experimentName}`;
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
};
export { getNeo4jGraph, getCSV };