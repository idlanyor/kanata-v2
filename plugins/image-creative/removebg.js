import { removeBg } from "../../lib/mediaMsg/image.js";
export const handler = ["removebg", "ilanginbg", 'hapusbg']
export const description = "✨ Ubah latar belakang gambar 📸";
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    // Jika gambar dalam bentuk buffer
    if (Buffer.isBuffer(attf)) {
        await sock.sendMessage(id, { text: `⏱️ Bentar,gambarmu sedang diproses` });
        try {
            // Mengunggah gambar dan mengubah latar belakang menggunakan API Remini
            let response = await removeBg(attf,psn)
            await sock.sendMessage(m.key.remoteJid, {
                document: response,
                mimetype: 'image/png',
                fileName: `KanataGhoib-${Math.floor(Math.random(2 * 5))}.png`
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
    await sock.sendMessage(id, { text: `Kirim atau balas gambar dengan caption *${handler.map(v => v).join(' / ')}* untuk mengubah latar belakang.\n ` });
};
