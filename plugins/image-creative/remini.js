import { skizo } from "../../helper/skizo.js";
import { uploadGambar2 } from "../../helper/uploader.js";

export const description = "Remini untuk mengubah gambar burik menjadi HD";
// sticker
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {

    if (Buffer.isBuffer(attf)) {
        try {
            const remini = await skizo('remini', {
                params: {
                    url: await uploadGambar2(attf),
                },
            })
            // remini.headers["Content-Type"] = "buffer"

            await sock.sendMessage(id, { image: remini.data, caption: 'HD/Remini berhasil' }, { quoted: m });

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
