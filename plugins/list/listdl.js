import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

export default async ({ sock, id, m, noTel, sender }) => {
    let sections = [{
        title: 'List Downloader Tools',
        rows: [
            {
                title: 'Tiktok Downloader by Url',
                id: `td`
            },
            {
                title: 'Tiktok Audio Downloader by Url',
                id: `tmd`
            },
            {
                title: 'Instagram Video Downloader by Url',
                id: `igv`
            },
            {
                title: 'Instagram Picture Downloader by Url',
                id: `igp`
            },
            {
                title: 'Download Youtube Video by Url',
                id: `yd`
            },
            {
                title: 'Play Youtube Audio by Query',
                id: `yp`
            },
            {
                title: 'Play Youtube Video by Query',
                id: `yv`
            },
            {
                title: 'Download Youtube Music by Url',
                id: `ymd`
            },
        ]
    }]

    let listMessage = {
        title: 'List Menu Downloader',
        sections
    };
    let msgDownloader = generateWAMessageFromContent(m.chat, {

        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },

                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Tekan tombol kanggo milih downloader sing pengen"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `©Little Kanata || Roidev`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `Daftar Downloader`
                    }),
                    gifPlayback: true,
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": JSON.stringify(listMessage)
                        }]
                    })
                })
            }
        }
    }, {
        quoted: {
            key: {
                remoteJid: '0@s.whatsapp.net',
                participant: '0@s.whatsapp.net'
            },
            message: {
                newsletterAdminInviteMessage: {
                    newsletterJid: '120363302865191524@newsletter',
                    newsletterName: 'Kanata Bot',
                    caption: sender
                }
            }
        }
    });

    console.log(msgDownloader)

    await sock.relayMessage(id, msgDownloader.message, {
        messageId: msgDownloader.key.id
    });
}
