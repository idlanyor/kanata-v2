export const handler = 'ailusi'
export const description = 'Biarkan AI membuat ilusi dari gambar yang kamu berikan '
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (Buffer.isBuffer(attf)) {
        await sock.sendMessage(id, { text: `⏱️ tunggu Bentar,Bot sedang membuat ilusi` });
        try {
            const imageUrl = await uploadGambar2(attf);
            const response = await fetch(`https://skizo.tech/api/illusion?apikey=${globalThis.apiHelper.skizotech.apikey}&url=${imageUrl}`);
            await sock.sendMessage(id, {
                image: { url: response.url },
                caption: '📷 Illusion Creation berhasil! 🎉'
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
    await sock.sendMessage(id, { text: 'Kirim atau balas gambar dengan caption *ailusi* <tema>.' });
};
