import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: globalThis.apiHelper.nxys.baseUrl
});

export const nyxs = async (url, config = {}) => {
    try {
        return await axiosInstance.get(url, config);
    } catch (error) {
        console.error('Error in nyxs request:', error);
        throw error;
    }
};

