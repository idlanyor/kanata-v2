import axios from 'axios';
import config from '../config.js';

const axiosInstance = axios.create({
    baseURL: config.nxys
});

export const nyxs = async (url, config = {}) => {
    try {
        return await axiosInstance.get(url, config);
    } catch (error) {
        console.error('Error in nyxs request:', error);
        throw error;
    }
};

