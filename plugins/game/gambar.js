import { tebak } from "../../helper/lolhuman.js";
import { tebakSession } from "../../lib/tebak/index.js";

const gambar = async (id, sock) => {
    try {
        const response = await tebak('gambar');
        const img = response.data.result.image;
        const answer = response.data.result.answer;
        await sock.sendMessage(id, { image: { url: img.replace(/\.png$/, '.jpg') } })

        tebakSession.set(id, {
            answer: answer,
            timeout: setTimeout(async () => {
                await sock.sendMessage(id, { text: `Waktu habis! Jawaban yang benar adalah: ${tebakSession.get(id).answer}` });
                tebakSession.delete(id);
            }, 60000) // 60 detik
        });
    } catch (error) {
        console.log(error)
        await sock.sendMessage(id, { text: 'Terjadi kesalahan, silakan coba lagi.' });
    }
};

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    await gambar(id, sock);
};
