import { meta } from "../../lib/downloader.js";
export const description = "Downloader Instagram Video provided by *Roidev*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if(psn === '') {
        await sock.sendMessage(id, { text: 'prefix *idv* <url> \n contoh : idv https://www.instagram.com/reels/CMd5Hr5Dx-7/?igshid=1jg9b5j7qk7t7' })
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
