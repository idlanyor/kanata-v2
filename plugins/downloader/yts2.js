import { ytsearch } from "../../lib/youtube.js";

let image = 'https://telegra.ph/file/30897fc6b429c59d2a733.jpg'
const ytSearchResult = async (query) => {
    const hasilPencarian = await ytsearch(query);
    let sections = [{
        title: namebot,
        highlight_label: 'start chats',
        rows: [{
            header: namebot,
            title: "Menu",
            description: `kembali ke menu !`,
            id: '.menu'
        },
        {
            header: namebot,
            title: "Owner Bot",
            description: "Owner bot Little Kanata",
            id: '.owner'
        }]
    }]
    hasilPencarian.forEach((hasil) => {
        sections.push({
            title: hasil.title,
            rows: [{
                title: "Get Video",
                description: `${hasil.title}`,
                id: `.ytmp4 ${hasil.url}`
            },
            {
                title: "Get Audio",
                description: `${hasil.title}`,
                id: `.ytmp3 ${hasil.url}`
            }]
        })
    })

    let listMessage = {
        title: 'Klik disini! ',
        sections
    };
    return listMessage
}


export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    let roy = `*Powered By Kanata*\nmenampilkan hasil pencarian untuk : "${psn}", pilih di bawah ini sesuai format yang Anda inginkan. 🍿`
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
                        subtitle: namebot,
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: image } }, { upload: conn.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify(ytSearchResult(psn))
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": "{\"display_text\":\"Pemilik bot\",\"id\":\".owner\"}"
                            },
                            {
                                "name": "cta_url",
                                "buttonParamsJson": `{"display_text":"Tiktok  🌐","url":"https://www.tiktok.com/@iroygganz?_t=8mHp0W1jmwS&_r=1","merchant_url":"https://www.tiktok.com/@iroygganz?_t=8mHp0W1jmwS&_r=1"}`
                            }
                        ],
                    })
                })
            }
        }
    }, { quoted: m })

    await sock.relayMessage(id, msg.message, {
        messageId: msg.key.id
    })
};

