import { uploadGambar2 } from "../../helper/uploader.js";

export const description = "Upload Image";

export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {

    if (Buffer.isBuffer(attf)) {
        try {
            await sock.sendMessage(id, { text: `Upload berhasil,ini Linknya puh : ${await uploadGambar2(attf)}` }, { quoted: m });
        } catch (error) {
            console.log('Error creating sticker:', error);
            await sock.sendMessage(id, { text: `Error creating sticker\n Reason :\n ${error}` });
        }

        return
    }
    // else {
    //   console.log('Media data not found');
    if (!m.message?.conversation && !m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
        return
    };
    //   await sock.sendMessage(id, { text: 'Kirim/reply gambar dengan caption s' });
    // }
    await sock.sendMessage(id, { text: 'Kirim/reply gambar dengan caption *upload*' });

};
