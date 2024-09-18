import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
export const handler = "listai"
export const description = "📜 *List Artificial Intelligence* 📜";

export default async ({ sock, id, m, noTel, sender }) => {
    let sections = [{
        title: '🤖 *Artificial Intelligence*',
        rows: [
            {
                title: '🤖 GPT3.5 - Skizotech',
                id: `ai`
            },
            {
                title: '⚡ GPT Turbo V2 - Skizotech',
                id: `ai2`
            },
            {
                title: '🌐 Gemini - Google',
                id: `gemini`
            },
            {
                title: '🚀 Mixtral - Official',
                id: `mixtral`
            },
            {
                title: '🦙 Llama3 Meta - Groq',
                id: `llama`
            },
            {
                title: '🌲 Mistral - Groq',
                id: `mistral`
            },
            {
                title: '💎 Gemma - Groq',
                id: `gemma`
            },
        ]
    }];

    let listMessage = {
        title: '✨ *Daftar AI Kanata* ✨',
        sections
    };

    let messageContent = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "🔍 *Pilih AI favoritmu dari daftar di bawah ini!*"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `©Little Kanata || Roidev`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `🧠 *AI Menu*`
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

    console.log(messageContent);

    await sock.relayMessage(id, messageContent.message, {
        messageId: messageContent.key.id
    });
};
