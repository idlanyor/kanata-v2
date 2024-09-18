import { tiktok } from "../../lib/downloader.js";
export const description = "Downloader TikTok provided by *Roidev*";
export const handler = "td"
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, { 
            text: "🎬 *Gunakan format:* \n\n`td <url>`\n\nContoh:\n`td https://vt.tiktok.com/ZSgQX6/`" 
        });
        return;
    }
    try {
        await sock.sendMessage(id, { text: '🔄 *Processing...* Mohon tunggu sebentar...' });
        let result = await tiktok(psn);
        await sock.sendMessage(id, { 
            video: { url: result.video }, 
            caption: `📹 *Video TikTok berhasil diunduh!*\n\n📄 *Title:* ${result.title}` 
        });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ *Terjadi kesalahan:* \n' + error.message });
    }
};
