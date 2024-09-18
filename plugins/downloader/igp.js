import { meta } from "../../lib/downloader.js";
export const description = "Downloader Instagram Picture provided by *Roidev*";
export const handler = "igp"
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, { 
            text: '🔍 *Gunakan format:* \n\n`idp <url>`\n\nContoh:\n`idp https://www.instagram.com/p/CMd5Hr5Dx-7/?igshid=1jg9b5j7qk7t7`' 
        });
        return;
    }
    try {
        await sock.sendMessage(id, { text: '🔄 *Processing...* Mohon tunggu sebentar...' });
        let result = await meta(psn);
        await sock.sendMessage(id, { image: { url: result }, caption: '📸 *Gambar berhasil diunduh!*' });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ *Terjadi kesalahan:* \n' + error.message });
    }
};
