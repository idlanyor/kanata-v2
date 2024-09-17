import { yutub } from "../../lib/downloader.js";
export const description = "Youtube Video Downloader provided by *Roidev*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, { text: 'prefix *yd* <url> \n contoh : yd https://youtu.be/7P8tR5cJXk0' })
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await yutub(psn)
        caption = '*Youtube Video Result*'
        caption += '\nTitle :' + `*${result.title}*`
        caption += '\nChannel :' + `*${result.channel}*`
        await sock.sendMessage(id, { video: { url: result.video }, caption });
    } catch (error) {
        await sock.sendMessage(id, { text: error.message });
    }
};
