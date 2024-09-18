import { tebak } from "../../helper/skizotech.js";
import { tebakSession } from "../../lib/tebak/index.js";
import { maskSentence } from "../../helper/word.js";
export const handler = "lontong"
export const description = "Teka Teki Sulit Cak Lontong";
const caklontong = async (id, sock) => {
    try {
        const response = await tebak('caklontong');
        const question = response.data.result.question;
        const answer = response.data.result.answer;

        await sock.sendMessage(id, { text: question + ` ${maskSentence(answer)} (${answer.length}) kata` });

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
    await caklontong(id, sock);
};
