import { ytPlay } from '../../lib/youtube.js';

export const description = 'Putar dan Download Video dari *YouTube*';

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

        await sock.sendMessage(id, { video: { url: result.video }, caption });

    } catch (error) {
        await sock.sendMessage(id, { text: '❌ Ups, terjadi kesalahan: ' + error.message });
    }
};
