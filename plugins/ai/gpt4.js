import { chatgpt4 } from "../../lib/ai.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, { text: "prefix *gemini* Tanyakan sesuatu kepada Gemini\n contoh : gemini siapa presiden indonesia saat ini" })
        return
    }
    await sock.sendMessage(id, { text: `_pertanyaan (${psn}) telah diterima dan sedang diproses_` })
    await sock.sendMessage(id, { text: await chatgpt4(psn) });
};
