import { gemmaGroq } from "../ai.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, { text: "Tanyakan sesuatu kepada Gemma" })
        return
    }
    await sock.sendMessage(id, { text: await gemmaGroq(psn) });
};
