import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
export const handler = "dipilih"
export default async ({ sock, id, m, noTel, sender }) => {

    let kanata = generateWAMessageFromContent(m.chat,
        {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },

                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: 'Invoice Pembayaran Panel'
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `© Roidev`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: ``,
                            thumbnailUrl: "https://telegra.ph/file/8360caca1efd0f697d122.jpg",
                            gifPlayback: true,
                            subtitle: "Kanata Invoice",
                        }),
                        gifPlayback: true,
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [{
                                "name": "review_and_pay",
                                "buttonParamsJson": '{"currency":"IDR","total_amount":{"value":200000,"offset":100},"reference_id":"4PZKVY0DT5N","type":"physical-goods","order":{"status":"payment_requested","subtotal":{"value":0,"offset":100},"order_type":"PAYMENT_REQUEST","items":[{"retailer_id":"custom-item-484f9856-9882-410f-88f9-94d0993b2fb1","name":"utang4","amount":{"value":200000,"offset":100},"quantity":1}]},"additional_note":"utang4","native_payment_methods":[]}'
                            }]
                        })
                    })
                }
            }
        },
        {
            quoted: {
                key: {
                    remoteJid: '0@s.whatsapp.net',
                    participant: '0@s.whatsapp.net'
                },
                message: {
                    newsletterAdminInviteMessage: {
                        newsletterJid: '120363305152329358@newsletter',
                        newsletterName: 'Kanata Bot',
                        caption: `${sender}: ${psn}`
                    }
                }
            }
        })

    await sock.relayMessage(id, kanata.message, {
        messageId: kanata.key.id
    });
};
// {
//     name: 'review_and_pay',
//     buttonParamsJson: '{"currency":"IDR","total_amount":{"value":200000,"offset":100},"reference_id":"4PZKVY0DT5N","type":"physical-goods","order":{"status":"payment_requested","subtotal":{"value":0,"offset":100},"order_type":"PAYMENT_REQUEST","items":[{"retailer_id":"custom-item-484f9856-9882-410f-88f9-94d0993b2fb1","name":"utang4","amount":{"value":200000,"offset":100},"quantity":1}]},"additional_note":"utang4","native_payment_methods":[]}'
//   }

// {
//     name: 'payment_status',
//         buttonParamsJson: '{"reference_id":"4PZKVY0DT5N","payment_status":"captured","payment_timestamp":1726402288,"order":{"status":"payment_requested","description":"","subtotal":{"value":0,"offset":100},"order_type":"PAYMENT_REQUEST","items":[{"retailer_id":"custom-item-484f9856-9882-410f-88f9-94d0993b2fb1","name":"utang4","amount":{"value":200000,"offset":100},"quantity":1}]}}'
// }


// {
//     name: 'review_order',
//     buttonParamsJson: '{"reference_id":"4PZKVY0DT5N","order":{"status":"completed","order_type":"ORDER"}}'
//   }
