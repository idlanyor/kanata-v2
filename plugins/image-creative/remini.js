import config from "../../config.js";
import { skizo } from "../../helper/skizo.js";
import { uploadGambar2 } from "../../helper/uploader.js";

export const description = "Remini untuk mengubah gambar burik menjadi HD";
// sticker
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {

    if (Buffer.isBuffer(attf)) {
        try {
            const api = await fetch(`https://skizo.tech/api/remini?apikey=${config.apiHelper.skizotech.apikey}&url=${await uploadGambar2(attf)}`);
            const image = await api;
            const { url } = image;
            // console.log(remini.data)
            // remini.headers["Content-Type"] = "buffer"
            await sock.sendMessage(id, { image: { url }, caption: '📷 HD/Remini berhasil' }, { quoted: m });

        } catch (error) {
            await sock.sendMessage(id, { text: 'Terjadi kesalahan, silakan coba lagi.\n' + error });
            throw error
        }
        return
    }
    if (!m.message?.conversation && !m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
        return
    };
    await sock.sendMessage(id, { text: 'Kirim/reply gambar dengan caption remini' });
};
