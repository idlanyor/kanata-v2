import { uploadGambar2 } from "../../helper/uploader.js";
export const handler = "hunkify"
export const description = "✨  Filter ini bisa merubah tubuhmu menjadi berotot ! 📸";
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    // Jika gambar dalam bentuk buffer
    if (Buffer.isBuffer(attf)) {
        await sock.sendMessage(id, { text: `⏱️ Bentar,bot sedang membuatmu berotot...` });
        try {
            // Mengunggah gambar dan mengubah menjadi HD menggunakan API hunkify
            const imageUrl = await uploadGambar2(attf);
            const response = await fetch(`https://skizo.tech/api/hunkify?apikey=${globalThis.apiHelper.skizotech.apikey}&url=${imageUrl}`);
            await sock.sendMessage(id, {
                image: { url: response.url },
                caption: '📷 Hunkify berhasil 🎉'
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
    await sock.sendMessage(id, { text: 'Kirim atau balas gambar dengan caption *hunkify* untuk mengubahnya menjadi Berotot.' });
};
