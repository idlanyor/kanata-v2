// import { clearMessages } from '@umamdev/wabe'
// import { wabe } from './helper/bot.js';
// import { meta, tiktok, yutub } from './downloader.js';
// import config from "./globalThis.js";
// import { groupParticipants, groupUpdate, grupAction } from './group.js';
// import { call } from './call.js';
// import { bendera, caklontong, checkAnswer, gambar, jenaka, susun, tebakSession } from './tebak/index.js';
// import sticker from './lib/sticker.js';
// import { cerpen } from './lib/random.js';
// import { ytPlay, ytSearchResult } from './lib/youtube.js';
// import { removebg } from './lib/image.js';
// import { gemini, gemmaGroq, llamaGroq, mistral, mixtralGroq } from './ai.js';
// import { helpMessage } from './helper/help.js';
// import { gambarPdf } from './lib/pdf.js';
// import { tomp3 } from './lib/converter.js';
// import { calculatePing, systemSpec } from './lib/owner/server.js';
// import { chatgpt4 } from './lib/rapidai.js';
// import { vcard } from './lib/owner/ownerContact.js';
// import { registerUser } from './helper/database.js';
// import { mediaMsg } from './plugins/media-message/index.js';
// import chalk from 'chalk';

// const bot = new wabe({
//     phoneNumber: globalThis.notelp,
//     sessionId: globalThis.namaSesi,
//     useStore: false
// })


// bot.start().then((sock) => {
//     sock.ev.on('messages.upsert', async chatUpdate => {
//         try {
//             let m = chatUpdate.messages[0];
//             await mediaMsg(sock, m, chatUpdate);

//             if (!m.message) return;
//             const chat = await clearMessages(m);
//             if (!chat) return;
//             let parsedMsg, sender, id, quotedMessageId, noTel;
//             if (chat.chatsFrom === "private") {
//                 parsedMsg = chat.message;
//                 sender = chat.pushName || chat.remoteJid;
//                 id = chat.remoteJid;
//                 noTel = chat.remoteJid;
//                 quotedMessageId = m;
//             } else if (chat.chatsFrom === "group") {
//                 console.log(chat);
//                 parsedMsg = chat.participant.message;
//                 noTel = chat.participant.number;
//                 sender = chat.participant.pushName || chat.participant.number;
//                 id = chat.remoteJid;
//                 quotedMessageId = m;
//             }
//             const pesan = parsedMsg.split(' ');
//             const cmd = pesan[0].toLowerCase();
//             const psn = pesan.slice(1).join(' ');
//             noTel = '@' + noTel.replace('@s.whatsapp.net', '');
//             let caption = "";
//             if (tebakSession.has(id)) {
//                 if (m.key.fromMe) return
//                 await checkAnswer(id, parsedMsg.toLowerCase(), sock, quotedMessageId);
//             } else {
//                 const plugins = {
//                     help: '',
//                     reg: '',
//                     owner: '',
//                     susun: async () => {
                        
//                     },
//                     switch: async () => {
                        
//                     },
//                     jenaka: async () => {
//                     },
//                     lontong: async () => {
//                     },
//                     gambar: async () => {
//                     },
//                     bendera: async () => {
//                     },
//                     ping: async () => {
//                     },
//                     stats: async () => {
//                     },
//                     yts: async () => {
//                     },
//                     // Downloader
//                     yp: async () => {
                        
//                     },
//                     ypv: async () => {
                        
//                     },
//                     yd: async () => {
                        
//                     },
//                     ymd: async () => {
                        
//                     },
//                     td: async () => {
                        
//                     },
//                     tmd: async () => {
                        
//                     },
//                     igv: async () => {
                        
//                     },
//                     // Artificial Intelligence
//                     gm: '',
//                     test: async () => {
//                     },
//                     gpt4: async () => {
                        
//                     },
//                     mistral: async () => {
                        
//                     },
//                     mixtral: async () => {
                       
//                     },
//                     llama: async () => {
                        
//                     },
//                     gemma: async () => {
                        
//                     },
//                 }

//                 if (plugins[cmd]) {
//                     await plugins[cmd]();
//                 }
//             }

//         } catch (error) {
//             console.log('_Ups, ada yang salah, silahkan coba beberapa saat lagi_', error)
//             // sock.sendMessage()
//         }
//     })
//     sock.ev.on('call', async (ev) => {
//         call(ev, sock)
//     });
//     sock.ev.on('group-participants.update', async (ev) => {
//         groupParticipants(ev, sock)
//     });

//     // Event listener for group updates
//     sock.ev.on('groups.update', async (ev) => {
//         groupUpdate(ev, sock);
//     });
//     // sock.ev.on('presence.update', (presence) => {
//     //     console.log('Presence update event:', presence);
//     //     // You can handle presence updates here, for example, logging user status changes
//     //     console.log(`User: ${presence.id}, Status: ${presence.presences}`);

//     // });
// }).catch(error => console.log("Error starting Bot :", error))