import { meta } from "../../lib/downloader.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await meta(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { video: { url: result } });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
