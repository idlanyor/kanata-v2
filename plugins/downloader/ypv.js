import { ytPlay } from '../../lib/youtube.js'

export const description = 'Putar dan Download Audio dari *Youtube*'

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        if (psn === '') {
            await sock.sendMessage(id, { text: "Masukan judul video yang akan diputar" })
            return
        }
        await sock.sendMessage(id, { text: 'Processing, please wait...' });
        let result = await ytPlay(psn)
        caption = '*Youtube Play Video Result*'
        caption += '\nTitle : ' + `*${result.title}*`
        caption += '\nChannel : ' + `*${result.channel}*`
        caption += '\n\n_⏳Bentar yaa, audio lagi dikirim⏳_'

        await sock.sendMessage(id, { video: { url: result.video }, caption });
    } catch (error) {
        await sock.sendMessage(id, { text: 'ups,' + error.message });
    }
};
