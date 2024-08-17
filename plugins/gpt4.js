import { chatgpt4 } from "../features/rapidai";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await sock.sendMessage(id, { text: "Tanyakan sesuatu kepada GPT-4" })
        return
    }
    await sock.sendMessage(id, { text: `_pertanyaan (${psn}) telah diterima dan sedang diproses_` })
    await sock.sendMessage(id, { text: await chatgpt4(psn) });
};
