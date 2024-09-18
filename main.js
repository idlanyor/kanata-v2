import { wabe, clearMessages } from './helper/bot.js';
import config from "./config.js";
import { groupParticipants, groupUpdate } from './lib/group.js';
import { checkAnswer, tebakSession } from './lib/tebak/index.js';
import { getMedia } from './helper/mediaMsg.js';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import readline from 'readline';
import { call } from './lib/call.js';
import { getGroupMetadata } from './helper/group.js';

// Mendefinisikan __dirname untuk ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fungsi untuk mencari semua file .js secara rekursif
function findJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Jika itu folder, lakukan rekursi
        if (stat && stat.isDirectory()) {
            results = results.concat(findJsFiles(filePath));
        }
        // Jika itu file .js, tambahkan ke results
        else if (file.endsWith('.js')) {
            results.push(filePath);
        }
    });
    return results;
}


async function getPhoneNumber() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const namaSesiPath = path.join(__dirname, config.namaSesi);
    try {
        await fs.promises.access(namaSesiPath);
        rl.close();
        return config.notelp;
    } catch {
        return new Promise(resolve => {
            rl.question(chalk.yellow("Masukkan nomor telepon (dengan kode negara, contoh: 628xxxxx): "), input => {
                rl.close();
                resolve(input);
            });
        });
    }
}

async function prosesPerintah({ command, sock, m, id, sender, noTel, attf }) {
    if (!command) return;
    let [cmd, ...args] = "";
    [cmd, ...args] = command.split(' ');
    if (command.startsWith('!')) cmd = command.substring(1);
    // console.log(cmd)
    const pluginsDir = path.join(__dirname, 'plugins');
    const plugins = Object.fromEntries(
        await Promise.all(findJsFiles(pluginsDir).map(async file => {
            // const pluginName = path.basename(file, '.js');
            const { default: plugin, handler } = await import(pathToFileURL(file).href);
            // console.log(handler);
            return [handler, plugin];
        }))
    );
    if (plugins[cmd]) {
        await plugins[cmd]({ sock, m, id, psn: args.join(' '), sender, noTel, attf });
    }

}

async function startBot() {
    const phoneNumber = await getPhoneNumber();
    const bot = new wabe({ phoneNumber, sessionId: config.namaSesi });

    bot.start().then(sock => {
        sock.ev.on('messages.upsert', async chatUpdate => {
            try {
                const m = chatUpdate.messages[0];
                // m.message?.conversation
                // console.log(() ? true : false);
                const { remoteJid } = m.key;
                const sender = m.pushName || remoteJid;
                const id = remoteJid;
                const noTel = remoteJid;

                if (m.message?.imageMessage || m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
                    const imageMessage = m.message.imageMessage || m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
                    const imageBuffer = await getMedia({ message: { imageMessage } });
                    const commandImage = m.message.imageMessage?.caption || m.message.extendedTextMessage?.text;
                    await prosesPerintah({ command: commandImage, sock, m, id, sender, noTel, attf: imageBuffer });
                }

                if (m.message?.audioMessage || m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage) {
                    const audioMessage = m.message.audioMessage || m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage;
                    const audioBuffer = await getMedia(audioMessage);
                    const commandAudio = m.message.audioMessage?.caption || m.message.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage?.caption;
                    await prosesPerintah({ command: commandAudio, sock, m: audioMessage, id, sender, noTel, attf: audioBuffer });
                }

                if (m.message?.videoMessage || m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage) {
                    const videoMessage = m.message.videoMessage || m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
                    const videoBuffer = await getMedia(videoMessage);
                    const commandVideo = m.message.videoMessage?.caption || m.message.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption;
                    await prosesPerintah({ command: commandVideo, sock, m: videoMessage, id, sender, noTel, attf: videoBuffer });
                }
                if (m.message?.interactiveResponseMessage?.nativeFlowResponseMessage) {
                    const cmd = JSON.parse(m.message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson);
                    // console.log("perintah", cmd.id);
                    await prosesPerintah({ command: `!${cmd.id}`, sock, m, id, sender, noTel });
                }

                const chat = await clearMessages(m);
                if (chat) {
                    const parsedMsg = chat.chatsFrom === "private" ? chat.message : chat.participant.message;
                    if (tebakSession.has(id)) {
                        await checkAnswer(id, parsedMsg.toLowerCase(), sock, m, noTel);
                    } else {
                        await prosesPerintah({ command: parsedMsg, sock, m, id, sender, noTel });
                    }
                }
                
                // console.log(sock.user.id)
                // let metadata = await getGroupMetadata({ sock, id });
                // console.log(metadata)
                // metadata.announce
                // console.log(await sock.groupMetadata('120363249874424747@g.us'))
                // console.log(await sock.fetchStatus(id));

                // sock.groupParticipantsUpdate(id, [...id], 'promote')
                // sock.groupParticipantsUpdate(id, [...id], 'demote')
                // sock.groupParticipantsUpdate(id, [...id], 'remove')
                // sock.groupParticipantsUpdate(id, [...id], 'add')
                // sock.groupParticipantsUpdate(id, [...id], 'promote')
            } catch (error) {
                console.log('Error handling message:', error);
            }
        });

        sock.ev.on('group-participants.update', ev => groupParticipants(ev, sock));
        sock.ev.on('groups.update', ev => groupUpdate(ev, sock));
        sock.ev.on('call', (callEv) => {
            call(callEv, sock)
        })
    }).catch(error => console.log("Error starting Bot:", error));
}

startBot();
