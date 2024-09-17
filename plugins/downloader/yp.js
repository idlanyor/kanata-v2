import { ytPlay } from '../../lib/youtube.js'
export const description = 'Putar dan Download Audio dari *Youtube*'
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        if (psn === '') {
            sock.sendMessage(id, { text: "Masukan judul lagu yang akan diputar" })
            return
        }
        await sock.sendMessage(id, { text: `Sedang mencari ${psn} ...` });
        let result = await ytPlay(psn)
        caption = '*Hasil Pencarian Youtube Play*'
        // caption += '_Preview gambarnya ga ada,xD_\n'
        caption += '\n Judul :' + `*${result.title}*`
        caption += '\n Durasi :' + `*${result.duration}*`
        caption += '\n _⏳Bentar yaa, audio lagi dikirim⏳_'

        await sock.sendMessage(id, { image: { url: result.thumbnail }, caption }, { quoted: m });
        // await sock.sendMessage(id, { text: result.audio })
        await sock.sendMessage(id, { audio: { url: result.audio }, mimetype: 'audio/mp4', fileName: result.title }, { quoted: m });
    } catch (error) {
        await sock.sendMessage(id, { text: 'ups,' + error.message });
    }
};
