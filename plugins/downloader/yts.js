import pkg, { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
const { proto } = pkg;
import { ytsearch } from "../../lib/youtube.js";
export const handler = "yts"
export const description = "Cari Video dari *YouTube*";

let image = 'https://telegra.ph/file/30897fc6b429c59d2a733.jpg';

const ytSearchResult = async (query) => {
    const hasilPencarian = await ytsearch(query);
    let sections = [{
        title: "Little Kanata",
        highlight_label: 'Start Chats',
        rows: [{
            header: "Little Kanata",
            title: "Menu",
            description: `Kembali ke menu!`,
            id: '.menu'
        },
        {
            header: "Little Kanata",
            title: "Owner Bot",
            description: "Owner bot Little Kanata",
            id: '.owner'
        }]
    }];

    hasilPencarian.forEach((hasil) => {
        sections.push({
            title: hasil.title,
            rows: [{
                title: "Get Video 🎥",
                description: `${hasil.title}`,
                id: `yd ${hasil.url}`
            },
            {
                title: "Get Audio 🎵",
                description: `${hasil.title}`,
                id: `ymd ${hasil.url}`
            }]
        });
    });

    let listMessage = {
        title: '🔍 Hasil Pencarian YouTube',
        sections
    };
    return listMessage;
}

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn == "") {
        return sock.sendMessage(id, { text: "🔎 Mau cari apa?\nKetik *yts <query>*\nContoh: *yts himawari*" });
    }

    let roy = `*Powered By Little Kanata*\nMenampilkan hasil pencarian untuk: "${psn}", pilih di bawah ini sesuai format yang Kamu inginkan. 🍿`;
    
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: roy
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '©️ Little Kanata'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: sender,
                        hasMediaAttachment: true, 
                        ...(await prepareWAMessageMedia({ image: { url: image } }, { upload: sock.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify(await ytSearchResult(psn, sender))
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": "{\"display_text\":\"Owner Bot\",\"id\":\".owner\"}"
                            }
                        ],
                    })
                })
            }
        }
    }, { quoted: m });

    await sock.relayMessage(id, msg.message, {
        messageId: msg.key.id
    });
};
