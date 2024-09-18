import { ytPlay } from '../../lib/youtube.js';

export const description = 'Putar dan Download Video dari *YouTube*';
export const handler = ""
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    try {
        if (psn === '') {
            await sock.sendMessage(id, { text: '🎥 Masukkan judul video yang ingin diputar atau dicari.' });
            return;
        }

        await sock.sendMessage(id, { text: '🔍 Sedang mencari video... Mohon tunggu sebentar.' });
        let result = await ytPlay(psn);

        caption = '*Hasil Pencarian Video YouTube*';
        caption += `\n\n📹 *Judul:* ${result.title}`;
        caption += `\n📺 *Channel:* ${result.channel}`;
        caption += `\n\n⏳ _Video sedang dikirim. Mohon bersabar..._`;
        const response = await fetch(result.audio);
        const arrBuffer = await response.arrayBuffer()
        console.log(Buffer.from(arrBuffer))

        await sock.sendMessage(id, { video: Buffer.from(arrBuffer), caption });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ Ups, terjadi kesalahan: ' + error.message });
    }
};
