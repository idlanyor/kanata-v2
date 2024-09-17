import { yutub } from "../../lib/downloader.js";
export const description = "Youtube Audio Downloader provided by *Roidev*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, { text: 'prefix *ymd* <url> \n contoh : ymd https://youtu.be/7P8tR5cJXk0' })
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await yutub(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { audio: { url: result.audio }, ptt: true });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
