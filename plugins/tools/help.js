import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import { helpMessage } from '../../helper/help.js'
export const handler = "menu"
export const description = "List All Menu";
export default async ({ sock, id, m, noTel, sender }) => {
    const { caption, plugins } = await helpMessage()
    let sections = []
    for (const plugin in plugins) {
        sections.push({
            title: `❏┄┅━┅┄〈 〘 ${plugin.toUpperCase()} 〙`,
            rows: plugins[plugin].map((command) => {
                return {
                    title: Array.isArray(command.handler)
                        ? command.handler.map(h => h.toUpperCase()).join(', ')
                        : command.handler.toUpperCase(),
                    description: command.description,
                    id: `${command.handler}`
                }
            })
        })
    }


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
                        text: caption
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `© Roidev`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `Little Kanata by Roy`,
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
        quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: sender } }
    });

    await sock.relayMessage(id, kanata.message, {
        messageId: kanata.key.id
    });
}