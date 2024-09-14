import { getMedia } from "../../helper/mediaMsg.js";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (m.message.imageMessage || (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.quotedMessage && m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage)) {
        let imageMessage = m.message.imageMessage || (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.quotedMessage && m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage);
        let cmd = (m.message.imageMessage && m.message.imageMessage.caption) || (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.quotedMessage && m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage && m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption);
        console.log('buffer', imageMessage);
        console.log('caption', cmd);
    }

};
