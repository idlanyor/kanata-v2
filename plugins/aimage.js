import { dalle3 } from "../lib/ai.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if(psn ==""){
        await sock.sendMessage(id, { text: "Kasih querynya dong banh,\ncontoh : *aimage loli kawaii*" })
        return
    }
    try {
        await sock.sendMessage(id, { text: 'Processing, please wait...' })
        await sock.sendMessage(id, { image: { url: await dalle3(psn) } })
    } catch (error) {
        sock.sendMessage(id, { text: error })
    }
};
