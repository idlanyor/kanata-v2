import axios from 'axios';
import config from '../config.js';

const axiosInstance = axios.create({
    baseURL: config.apiHelper.skizotech.baseUrl,
    params: {
        apikey: config.apiHelper.skizotech.apikey
    }
});

export const tebak = async (url, config = {}) => {
    try {
        return await axiosInstance.get('game/' + url, config);
    } catch (error) {
        console.error('Error in tebak request:', error);
        throw error; // Rethrow the error for handling in calling functions
    }
};
export const lol = async (url, config = {}) => {
    try {
        return await axiosInstance.get(url, config);
    } catch (error) {
        console.error('Error in tebak request:', error);
        throw error;
    }
};
export const lolPost = async (url, config = {}) => {
    try {
        return await axiosInstance.post(url, config);
    } catch (error) {
        console.error('Error in tebak request:', error);
        throw error;
    }
};
