import { getMedia } from "../../helper/mediaMsg.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (!m.message && !m.message.ImageMessage) {
        await sock.sendMessage(id, { text: 'Bukan gambar' })
    } else {
        await sock.sendMessage(id, { text: 'Oke ini gambar ' })
    }
    // let anu = await getMedia(m)
};
