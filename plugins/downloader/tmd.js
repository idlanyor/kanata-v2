import { tiktok } from "../../lib/downloader.js";
export const description = "Downloader TikTok Audio provided by *Roidev*";
export const handler = "tmd"
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, { 
            text: "🎵 *Gunakan format:* \n\n`tmd <url>`\n\nContoh:\n`tmd https://vt.tiktok.com/ZSgQX6/`" 
        });
        return;
    }
    try {
        await sock.sendMessage(id, { text: '🔄 *Processing...* Mohon tunggu sebentar...' });
        let result = await tiktok(psn);
        await sock.sendMessage(id, { 
            audio: { url: result.audio },
            caption: '🎧 *Audio TikTok berhasil diunduh!*' 
        });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ *Terjadi kesalahan:* \n' + error.message });
    }
};
