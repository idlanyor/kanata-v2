import { meta } from "../../lib/downloader.js";
export const description = "Downloader Facebook Reels provided by *Roidev*";
export const handler = "fd"
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, {
            text: '🔍 *Gunakan format:* \n\n`fd <url>`\n\nContoh:\n`fd https://www.facebook.com/reels/103607619647607/?itct=ig_story_broadcast`'
        });
        return;
    }
    try {
        await sock.sendMessage(id, { text: '🔄 *Processing...* Mohon tunggu sebentar...' });
        let result = await meta(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { video: { url: result }, caption: '🎥 *Video berhasil diunduh!*' });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ *Terjadi kesalahan:* \n' + error.message });
    }
};
