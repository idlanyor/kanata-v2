import { tiktok } from "../downloader.js";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await tiktok(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { audio: { url: result.audio } });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
