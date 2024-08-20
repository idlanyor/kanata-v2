import { ytPlay } from '../lib/youtube.js'
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        if (psn === '') {
            sock.sendMessage(id, { text: "Masukan judul lagu yang akan diputar" })
            return
        }
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await ytPlay(psn)
        caption = '*Youtube Play Result*'
        // caption += '_Preview gambarnya ga ada,xD_\n'
        caption += '\nTitle :' + `*${result.title}*`
        caption += '\nChannel :' + `*${result.channel}*`
        caption += '\n _⏳Bentar yaa, audio lagi dikirim⏳_'

        await sock.sendMessage(id, { image: result.thumbnail })
        // await sock.sendMessage(id, { text: result.audio })
        await sock.sendMessage(id, { audio: { url: result.audio }, ptt: true });
    } catch (error) {
        await sock.sendMessage(id, { text: 'ups,' + error.message });
    }
};
