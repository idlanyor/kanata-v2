import config from "../../config.js";
import { uploadGambar2 } from "../../helper/uploader.js";
export const handler = ""
export const description = "✨ Remini: Ubah gambar burik menjadi HD! 📸";
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    // Jika gambar dalam bentuk buffer
    if (Buffer.isBuffer(attf)) {
        try {
            // Mengunggah gambar dan mengubah menjadi HD menggunakan API Remini
            const imageUrl = await uploadGambar2(attf);
            const response = await fetch(`https://skizo.tech/api/remini?apikey=${config.apiHelper.skizotech.apikey}&url=${imageUrl}`);
            // const { url } = await response.arrayBuffer();
            // console.log(response.url)
            await sock.sendMessage(id, { text: `⏱️ Bentar,gambar burikmu sedang diproses` });
            // Mengirimkan gambar hasil yang sudah diubah ke HD
            await sock.sendMessage(id, {
                image: { url: response.url },
                caption: '📷 HD Image berhasil! Gambar burikmu telah dikonversi ke kualitas HD 🎉'
            }, { quoted: m });

        } catch (error) {
            // Penanganan kesalahan dengan pesan lebih informatif
            await sock.sendMessage(id, { text: `⚠️ Terjadi kesalahan saat memproses gambar. Coba lagi nanti ya!\n\nError: ${error.message}` });
        }
        return;
    }

    // Cek jika tidak ada gambar yang dikirim atau tidak dalam format yang benar
    if (!m.message?.conversation && !m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
        return
    }
    await sock.sendMessage(id, { text: 'Kirim atau balas gambar dengan caption *remini* untuk mengubahnya menjadi HD.' });
};
