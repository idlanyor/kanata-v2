import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import { helpMessage } from '../../helper/help.js'

export default async ({ sock, id, m, noTel, sender }) => {
    let sections = [{
        title: 'List Menu Little Kanata Bot',
        rows: [{
            title: 'Artificial Intelligence',
            description: `Tampilkan Fitur AI`,
            id: `listai`
        },
        {
            title: 'Downloader',
            description: "Tampilkan Fitur Download",
            id: `listdl`
        },
        {
            title: 'Mini Game',
            description: "Tampilkan List Mini Game",
            id: `listmg`
        },
        {
            title: 'Webzone Menu',
            description: "Tampilkan Fitur Webzone",
            id: `listweb`
        },
        {
            title: 'Image Menu',
            description: "Tampilkan Fitur Kreasi Gambar",
            id: `listimg`
        },
        {
            title: 'Tools Menu',
            description: "Tampilkan Fitur Tools",
            id: `listtools`
        },
        {
            title: 'SMM Menu',
            description: "Tampilkan Fitur SMM",
            id: `listsmm`
        },
        {
            title: 'Sticker Menu',
            description: "Tampilkan Fitur Sticker",
            id: `liststik`
        },
        {
            title: 'Menu Simple',
            description: "Tampilkan Simple Menu",
            id: `menu`
        },
        {
            title: 'Owner Menu List',
            description: "Display All Owner •",
            id: `listown`
        }]
    }]

    let listMessage = {
        title: 'List Menu Kanata',
        sections
    };

    let kanata = generateWAMessageFromContent(m.chat, {

        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },

                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: await helpMessage()
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `© Roidev`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `LittleKanata by Roy`,
                        thumbnailUrl: "https://telegra.ph/file/8360caca1efd0f697d122.jpg",
                        gifPlayback: true,
                        subtitle: "Kanata List Menu",
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
    console.log(kanata)

    await sock.relayMessage(id, kanata.message, {
        messageId: kanata.key.id
    });
    // await sock.sendMessage(id, {
    //     document: fs.readFileSync("./kanata.docx"), // Path ke file MS Word
    //     fileName: 'Kanata.docx', // Nama file MS Word
    //     mimetype: 'application/msword',
    //     fileLength: 1099511627776,
    //     jpegThumbnail: fs.readFileSync("./kanata.jpg"), // Gambar thumbnail
    //     caption: await helpMessage(sender, noTel),
    // }

    //     , {
    //         quoted: {
    //             key: {
    //                 remoteJid: '0@s.whatsapp.net',
    //                 participant: '0@s.whatsapp.net'
    //             },
    //             message: {
    //                 newsletterAdminInviteMessage: {
    //                     newsletterJid: '120363302865191524@newsletter',
    //                     newsletterName: 'Kanata Bot',
    //                     caption: sender
    //                 }
    //             }
    //         }
    //     })
}