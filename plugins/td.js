import { tiktok } from "../lib/downloader.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await tiktok(psn);
        await sock.sendMessage(id, { video: { url: result.video }, caption: result.title });
    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
