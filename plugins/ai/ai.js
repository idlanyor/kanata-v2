import { gptSkizo } from "../../lib/ai.js";

// Metadata deskripsi perintah
export const description = "AI GPT 3.5 provided by *SkizoTech*";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, {
            text: "prefix *ai* Tanyakan sesuatu kepada Ai\n contoh : ai siapa presiden indonesia saat ini"
        });
        return;
    }
    await sock.sendMessage(id, { text: await gptSkizo(psn) });
};
