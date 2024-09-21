import loadAssets from "../../helper/loadAssets.js";

export const handler = ['p', 'oy']
export const description = 'p'
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    await sock.sendMessage(id, { audio: await loadAssets('anjay.ogg', 'voice'), ptt: true }, { quoted: m });
};
