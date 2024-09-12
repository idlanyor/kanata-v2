import axios from 'axios';
import FormData from 'form-data';
import config from '../../config.js';
import { getMedia } from '../../helper/mediaMsg.js';

async function removeBg(blob, color) {
    const formData = new FormData();
    formData.append('size', 'auto');
    // formData.append('bg_color', '#DB1614');
    formData.append('image_file', blob);

    try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': config.removeBG
            },
            responseType: 'arraybuffer',
        });

        return response.data;
    } catch (error) {
        throw new Error(`${error.response.status}: ${error.response.statusText}`);
    }
}

export async function removebg(sock, m, chatUpdate) {
    if (chatUpdate.messages[0].message?.imageMessage?.caption == 'rem' && chatUpdate.messages[0].message?.imageMessage) {

        const mediaData = await getMedia(m)
        if (!mediaData) {
            console.log('Media data not found');
            return;
        }


        try {
            let response = await removeBg(mediaData)
            await sock.sendMessage(m.key.remoteJid, {
                document: response,
                mimetype: 'image/png',
                fileName: `KanataGhoib-${Math.random(3 * 5)}.png`
            });
        } catch (error) {
            console.log('Error removing background:', error);
        }
    }
}