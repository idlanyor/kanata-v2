// import { clearMessages } from '@umamdev/wabe'
import { wabe, clearMessages } from './helper/bot.js';
import config from "./config.js";
import { mediaMsg } from './plugins/media-message/index.js';
import { fileURLToPath, pathToFileURL } from 'url';
import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline'
import path, { join } from 'path';
import { dirname } from 'path';
import { groupParticipants, groupUpdate } from './lib/group.js';
import { checkAnswer, tebakSession } from './lib/tebak/index.js';
import { getMedia } from './helper/mediaMsg.js';

// Mendefinisikan __dirname untuk ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            // Jika itu folder, rekursif
            results = results.concat(findJsFiles(filePath));
        } else if (file.endsWith('.js')) {
            // Jika itu file .js, tambahkan ke results
            results.push(filePath);
        }
    });
    return results;
}

async function getPhoneNumber() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const namaSesiPath = join(__dirname, config.namaSesi);

    try {
        await fs.promises.access(namaSesiPath, fs.constants.F_OK);
        rl.close();
        return config.notelp;
    } catch (err) {
        return new Promise((resolve) => {
            rl.question(chalk.yellow("Masukkan nomor telepon (dengan kode negara, contoh: 628xxxxx): "), (input) => {
                rl.close();
                resolve(input);
            });
        });
    }
}

async function startBot() {
    const phoneNumber = await getPhoneNumber();

    const bot = new wabe({
        phoneNumber,
        sessionId: config.namaSesi,
        useStore: false
    });

    bot.start().then((sock) => {
        sock.ev.on('messages.upsert', async chatUpdate => {
            try {
                let m = chatUpdate.messages[0];
                let parsedMsg, sender, id, quotedMessageId, noTel;
                if (m.key.remoteJid.endsWith("g.us")) {
                    parsedMsg = m.message?.conversation.trim();
                    sender = m.pushName || m.key.remoteJid;
                    id = m.key.remoteJid;
                    noTel = m.key.remoteJid;
                    quotedMessageId = m;
                } else {
                    parsedMsg = m.message?.conversation.trim()
                    noTel = m.key.remoteJid;
                    sender = m.pushName || m.participant.number;
                    id = m.key.remoteJid;
                    quotedMessageId = m;
                }
                if (m.message && m.message.interactiveResponseMessage) {


                    const { id: cmdFromlist } = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)
                    const pesan = cmdFromlist.split(' ');
                    const cmd = pesan[0].toLowerCase();
                    const psn = pesan.slice(1).join(' ');
                    const pluginsDir = path.join(__dirname, 'plugins');
                    const pluginFiles = findJsFiles(pluginsDir);
                    const plugins = {};
                    let caption = ""
                    for (const file of pluginFiles) {
                        const pluginName = path.basename(file, '.js');
                        const { default: plugin } = await import(pathToFileURL(file).href);
                        plugins[pluginName] = plugin;
                    }
                    console.log(cmd)
                    if (plugins[cmd]) {
                        await plugins[cmd]({ sock, m, id, psn, sender, noTel, caption });
                    }
                }

                if (m.message.imageMessage ||
                    (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo &&
                        m.message.extendedTextMessage.contextInfo.quotedMessage &&
                        m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage)) {
                    let imageBuffer;
                    let commandImage;

                    if (m.message.imageMessage) {
                        imageBuffer = await getMedia(m);
                        commandImage = m.message.imageMessage.caption;
                    } else {
                        const quotedMsg = m.message.extendedTextMessage.contextInfo.quotedMessage;
                        imageBuffer = await getMedia({
                            message: {
                                imageMessage: quotedMsg.imageMessage
                            }
                        });
                        commandImage = m.message.extendedTextMessage.text;
                    }

                    await prosesPerintah({ command: commandImage, sock, m, id, sender, noTel, attf: imageBuffer });
                }

                if (m.message.audioMessage ||
                    (m.message.extendedTextMessage &&
                        m.message.extendedTextMessage.contextInfo
                        && m.message.extendedTextMessage.contextInfo.quotedMessage
                        && m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage)) {
                    let audioMessage = m || (m.message.extendedTextMessage &&
                        m.message.extendedTextMessage.contextInfo
                        && m.message.extendedTextMessage.contextInfo.quotedMessage
                        && m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage);

                    let commandAudio = (m.message.audioMessage && m.message.audioMessage.caption) ||
                        (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo &&
                            m.message.extendedTextMessage.contextInfo.quotedMessage &&
                            m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage &&
                            m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.caption);

                    const audioBuffer = await getMedia(audioMessage);
                    await prosesPerintah({ command: commandAudio, sock, m: audioMessage, id, sender, noTel, attf: audioBuffer });
                }

                if (m.message.videoMessage ||
                    (m.message.extendedTextMessage &&
                        m.message.extendedTextMessage.contextInfo &&
                        m.message.extendedTextMessage.contextInfo.quotedMessage &&
                        m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage)) {
                    let videoMessage = m || (m.message.extendedTextMessage &&
                        m.message.extendedTextMessage.contextInfo
                        && m.message.extendedTextMessage.contextInfo.quotedMessage
                        && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage);

                    let commandVideo = (m.message.videoMessage && m.message.videoMessage.caption) ||
                        (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo &&
                            m.message.extendedTextMessage.contextInfo.quotedMessage &&
                            m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage &&
                            m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption);

                    const videoBuffer = await getMedia(videoMessage);
                    await prosesPerintah({ command: commandVideo, sock, m: videoMessage, id, sender, noTel, attf: videoBuffer });
                }

                async function prosesPerintah({ command, sock, m, id, sender, noTel, attf }) {
                    if (!command) return
                    const pesan = command.split(' ');
                    const cmd = pesan[0].toLowerCase();
                    const psn = pesan.slice(1).join(' ');
                    const pluginsDir = path.join(__dirname, 'plugins');
                    const pluginFiles = findJsFiles(pluginsDir);
                    const plugins = {};
                    let caption = ""
                    for (const file of pluginFiles) {
                        const pluginName = path.basename(file, '.js');
                        const { default: plugin } = await import(pathToFileURL(file).href);
                        plugins[pluginName] = plugin;
                    }
                    console.log("command :", cmd)
                    console.log(m)
                    if (plugins[cmd]) {
                        await plugins[cmd]({ sock, m, id, psn, sender, noTel, caption, attf });
                    }
                }

                // await mediaMsg(sock, m, chatUpdate);

                if (!m.message) return;
                if (m.key && m.key.remoteJid === "status@broadcast") await sock.readMessages([m.key])
                if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return;
                const chat = await clearMessages(m);
                if (!chat) return;

                if (chat.chatsFrom === "private") {
                    parsedMsg = chat.message;
                    sender = chat.pushName || chat.remoteJid;
                    id = chat.remoteJid;
                    noTel = chat.remoteJid;
                    quotedMessageId = m;
                } else if (chat.chatsFrom === "group") {
                    console.log(chat);
                    parsedMsg = chat.participant.message;
                    noTel = chat.participant.number;
                    sender = chat.participant.pushName || chat.participant.number;
                    id = chat.remoteJid;
                    quotedMessageId = m;
                }

                const pesan = parsedMsg.split(' ');
                const cmd = pesan[0].toLowerCase();
                const psn = pesan.slice(1).join(' ');
                noTel = '@' + noTel.replace('@s.whatsapp.net', '');
                let isOwner = noTel.replace('@', '') !== config.ownerNumber
                let caption = "";
                let lastGreetTime = 0;
                const greetInterval = 10 * 60 * 1000;
                let ownerGreeted = false;
                const now = new Date().getTime();

                if (tebakSession.has(id)) {
                    if (m.key.fromMe) return
                    await checkAnswer(id, parsedMsg.toLowerCase(), sock, quotedMessageId, noTel);
                } else {
                    const pluginsDir = path.join(__dirname, 'plugins');
                    const pluginFiles = findJsFiles(pluginsDir);
                    const plugins = {};
                    for (const file of pluginFiles) {
                        const pluginName = path.basename(file, '.js');
                        const { default: plugin } = await import(pathToFileURL(file).href);
                        plugins[pluginName] = plugin;
                    }

                    if (plugins[cmd]) {
                        await plugins[cmd]({ sock, m, id, psn, sender, noTel, caption, isOwner });
                    }
                }

                // console.log(chalk.green(`┌────────────────────────────────────────────────────┐`));
                // console.log(chalk.green(`│`) + chalk.cyan(` Pesan Masuk `) + chalk.green(`│`));
                // console.log(chalk.green(`├────────────────────────────────────────────────────┤`));
                // console.log(chalk.green(`│`) + chalk.yellow(` Dari: `) + chalk.white(sender) + chalk.green(`│`));
                // console.log(chalk.green(`│`) + chalk.yellow(` Nomor: `) + chalk.white(noTel) + chalk.green(`│`));
                // console.log(chalk.green(`│`) + chalk.yellow(` Pesan: `) + chalk.white(parsedMsg) + chalk.green(`│`));
                // console.log(chalk.green(`└────────────────────────────────────────────────────┘`));
            } catch (error) {
                console.log('_Ups, ada yang salah, silahkan coba beberapa saat lagi_', error)
            }
        })

        sock.ev.on('call', async (ev) => {
            call(ev, sock)
        });

        sock.ev.on('group-participants.update', async (ev) => {
            groupParticipants(ev, sock)
        });

        sock.ev.on('groups.update', async (ev) => {
            groupUpdate(ev, sock);
        });
    }).catch(error => console.log("Error starting Bot :", error))
}

startBot()