import { gptSkizo2 } from "../../lib/ai.js";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, {
            text: "prefix *ai2* Tanyakan sesuatu kepada AI 2\n contoh : ai2 siapa presiden indonesia saat ini"
        })
        return
    }
    await sock.sendMessage(id, { text: await gptSkizo2(psn) });
};
