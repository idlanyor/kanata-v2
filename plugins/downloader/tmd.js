import { tiktok } from "../../lib/downloader.js";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, { text: 'prefix *tmd* <url> \n contoh : tmd https://vt.tiktok.com/ZSgQX6/' })
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await tiktok(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { audio: { url: result.audio } });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
