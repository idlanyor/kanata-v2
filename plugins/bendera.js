import { tebak } from "../helper/lolhuman.js";
import { tebakSession } from "../tebak/index.js";
export const bendera = async (id, sock) => {
    try {
        const response = await tebak('bendera');
        const question = response.data.result.flag;
        const answer = response.data.result.name;

        await sock.sendMessage(id, { text: question });

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
    await bendera(id, sock);
};
