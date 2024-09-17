import { meta } from "../../lib/downloader.js";
export const description = "Downloader Facebook Reels provided by *Roidev*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, { text: 'prefix *fd* <url> \n contoh : fd https://www.facebook.com/reels/103607619647607/?itct=ig_story_broadcast' });
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await meta(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { video: { url: result } });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
