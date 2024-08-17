import { helpMessage } from "../helper/help.js"

export default async ({ sock, id, m, noTel, sender }) => {
    await sock.sendMessage(id, {
        text: await helpMessage(sender, noTel),
        footer: 'Idlanyor',
        contextInfo: {
            forwardingScore: 100,
            isForwarded: false,
            mentionedJid: [id],
            forwardedNewsletterMessageInfo: {
                newsletterName: 'KanataBot',
                newsletterJid: m.key.remoteJid
            },
            externalAdReply: {
                showAdAttribution: true,
                title: 'KanataBot',
                body: '@roidev',
                thumbnailUrl: 'https://telegra.ph/file/8360caca1efd0f697d122.jpg',
                sourceUrl: 'https://chat.whatsapp.com/DvrnHEz7CZa4aWlzQd7B07',
                // sourceUrl: 'https://whatsapp.com/channel/0029Va4K0PZ5a245NkngBA2M',
                mediaType: 3,
                renderLargerThumbnail: false
            },
        },
    })
}