import { gemini } from "../../lib/ai.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, { text: "Tanyakan sesuatu kepada Mixtral" })
        return
    }
    await sock.sendMessage(id, { text: await mixtralGroq(psn) });
};
