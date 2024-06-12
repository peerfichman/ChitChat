import axios from 'axios';
const baseURL = process.env.REACT_APP_CHICHAT_API_URL;

const logout = async () => {
    console.log('logout');
    try {
        const response = await axios.post(`${baseURL}auth/logout`);
        console.log(response);
        // return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { logout };
