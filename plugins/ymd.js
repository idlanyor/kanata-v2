import { yutub } from "../lib/downloader.js";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await yutub(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { audio: { url: result.audio }, ptt: true });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
