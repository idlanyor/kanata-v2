import axios from 'axios';
import config from '../config.js';

const axiosInstance = axios.create({
    baseURL: config.apiHelper.skizotech.baseUrl,
    params: {
        apikey: config.apiHelper.skizotech.apikey
    }
});

export const skizo = async (url, config = {}) => {
    try {
        return await axiosInstance.get(url, config);
    } catch (error) {
        console.error('Error in skizo request:', error);
        throw error;
    }
};
