import { tiktok } from "../../lib/downloader.js";
export const description = "Downloader Tiktok provided by *Roidev*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, {
            text: "prefix *td* <url> \n contoh : td https://vt.tiktok.com/ZSgQX6/"
        })
        return
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await tiktok(psn);
        await sock.sendMessage(id, { video: { url: result.video }, caption: result.title });
    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
