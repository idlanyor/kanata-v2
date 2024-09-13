import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

export default async ({ sock, id, m, noTel, sender }) => {
    let sections = [{
        title: 'List Artificial Intelligence',
        rows: [
            {
                title: 'GPT3.5 - Skizotech',
                id: `ai`
            },
            {
                title: 'GPT Turbo V2 - Skizotech',
                id: `ai2`
            },
            {
                title: 'GPT WebAccess - Openai',
                id: `ai3`
            },
            {
                title: 'AI - Blackbox',
                id: `bb`
            },
            {
                title: 'Gemini - Google',
                id: `gemini`
            },
            {
                title: 'Mixtral - Official',
                id: `mistral`
            },
            {
                title: 'Llama3 Meta - Groq',
                id: `mistral`
            },
            {
                title: 'Mistral - Groq',
                id: `mistral`
            },
            {
                title: 'Gemma - Groq',
                id: `gemma`
            },

        ]
    }]

    let listMessage = {
        title: 'List Menu Kanata',
        sections
    };
    let msghhhhhhhhhhhhhhhhhhh = generateWAMessageFromContent(m.chat, {

        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },

                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Tekan tombol untuk melihat daftar AI yang tersedia"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `©Little Kanata || Roidev`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: ``
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
    console.log(msghhhhhhhhhhhhhhhhhhh)

    await sock.relayMessage(id, msghhhhhhhhhhhhhhhhhhh.message, {
        messageId: msghhhhhhhhhhhhhhhhhhh.key.id
    });
}