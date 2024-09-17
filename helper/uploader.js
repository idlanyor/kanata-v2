import axios from 'axios'
import FormData from 'form-data'
import config from '../config.js'
import fs from 'fs'

export const uploadGambar = async (buffer) => {
    try {
        const form = new FormData()
        form.append('file', buffer)
        form.append('api_key', config.apiHelper.imgHippo.apikey)
        const headers = {
            ...form.getHeaders()
        };
        const response = await axios.post(config.apiHelper.imgHippo.baseUrl, form, {
            headers
        })
        return response.data.url
    } catch (error) {
        throw error
    }
}

export const uploadGambar2 = async (buffer) => {
    try {
        const form = new FormData()
        form.append('file', buffer)
        const headers = {
            ...form.getHeaders()
        };
        const response = await axios.post('https://f.sed.lol/files', form, {
            headers
        })
        return response.data.url
    } catch (error) {
        throw error
    }
}

// (async () => {
//     try {
//         await fs.promises.access('./kanata.jpg');

//         const result = await uploadGambar2(fs.createReadStream('./kanata.jpg'));
//         console.log(result);
//     } catch (error) {
//         console.error('Error uploading file:', error)
//     }
// })()
