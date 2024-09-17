import { dalle3 } from "../../lib/ai.js";
export const description = "🎨 *AI Image Generator* disediakan oleh *SkizoTech*";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn.trim() === '') {
        // Pesan ketika query kosong
        await sock.sendMessage(id, {
            text: "🖼️ Kasih query gambarnya dong kak!\n\nContoh: *aimage loli kawaii* atau *aimage sunset di pantai*"
        });
        return;
    }

    try {
        // Notifikasi proses sedang berlangsung
        await sock.sendMessage(id, { text: '🎨 Sedang diproses, mohon tunggu sebentar ya... ⏳' });

        // Mengirimkan hasil gambar yang dihasilkan AI
        const imageUrl = await dalle3(psn);
        await sock.sendMessage(id, { image: { url: imageUrl }, caption: `✨ Ini hasil gambar untuk query: _${psn}_` });
    } catch (error) {
        // Penanganan error dengan pesan yang lebih estetik
        await sock.sendMessage(id, { text: `⚠️ Maaf, terjadi kesalahan:\n\n${error.message}` });
    }
};
