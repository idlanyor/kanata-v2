import { yutub } from "../downloader.js";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
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
