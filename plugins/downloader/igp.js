import { meta } from "../../lib/downloader.js";
export const description = "Downloader Instagram Picture provided by *Roidev*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if(psn === '') {
        sock.sendMessage(id, { text: 'prefix *idp* <url> \n contoh : idp https://www.instagram.com/p/CMd5Hr5Dx-7/?igshid=1jg9b5j7qk7t7' })
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await meta(psn);
        // console.log(result.audio)
        await sock.sendMessage(id, { image: { url: result } });

    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
