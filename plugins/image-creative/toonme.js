import { skizo } from "../../helper/skizo.js";
import { uploadGambar2 } from "../../helper/uploader.js";
export const handler = "gambarin"
export const description = "✨ Berikan gambarmu,dan biarkan Bot berimajinasi! 📸";
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (Buffer.isBuffer(attf)) {
        await sock.sendMessage(id, { text: `⏱️ tunggu Bentar,Bot sedang menggambar` });
        try {
            const imageUrl = await uploadGambar2(attf);
            const response = await skizo('toonme', {
                params: {
                    url: imageUrl
                }
            })
            console.log(response.data.url)
            await sock.sendMessage(id, {
                image: { url: response.data.url },
                caption: '📷 Anjay, berhasil! 🎉'
            }, { quoted: m });

        } catch (error) {
            console.log(error)
            // Penanganan kesalahan dengan pesan lebih informatif
            await sock.sendMessage(id, { text: `⚠️ Terjadi kesalahan saat memproses gambar. Coba lagi nanti ya!\n\nError: ${error.message}` });
        }
        return;
    }

    // Cek jika tidak ada gambar yang dikirim atau tidak dalam format yang benar
    if (!m.message?.conversation && !m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
        return
    }
    await sock.sendMessage(id, { text: 'Kirim atau balas gambar dengan caption *gambarin* untuk mengonversi gambar menjadi Kartun.' });
};
