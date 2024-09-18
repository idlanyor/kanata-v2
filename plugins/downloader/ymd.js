import { yutub } from "../../lib/downloader.js";
export const description = "YouTube Audio Downloader provided by *Roidev*";
export const handler = "ymd"
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, {
            text: '🎵 *Gunakan format:* \n\n`ymd <url>`\n\nContoh:\n`ymd https://youtu.be/7P8tR5cJXk0`'
        });
        return;
    }
    try {
        await sock.sendMessage(id, { text: '🔄 *Processing...* Mohon tunggu sebentar...' });
        let result = await yutub(psn);
        await sock.sendMessage(id, { audio: { url: result.audio }, ptt: true });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ *Terjadi kesalahan:* \n' + error.message });
    }
};
