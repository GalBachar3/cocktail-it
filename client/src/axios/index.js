import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const getAxiosClient = () => axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-type': 'application/json',
        Authorization: `bearer ${getToken()}`
    }
});

export default getAxiosClient;