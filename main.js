import { clearMessages } from '@umamdev/wabe'
import { wabe } from './helper/bot.js';
import config from "./config.js";
import { groupParticipants, groupUpdate, grupAction } from './group.js';
import { call } from './call.js';
import { mediaMsg } from './plugins/media-message/index.js';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { tebakSession, checkAnswer } from './tebak/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Mendefinisikan __dirname kanggo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bot = new wabe({
    phoneNumber: config.notelp,
    sessionId: config.namaSesi,
    useStore: false
})

bot.start().then((sock) => {
    sock.ev.on('messages.upsert', async chatUpdate => {
        try {
            let m = chatUpdate.messages[0];
            // make sticker
            await mediaMsg(sock, m, chatUpdate);

            if (!m.message) return;
            const chat = await clearMessages(m);
            if (!chat) return;
            let parsedMsg, sender, id, quotedMessageId, noTel;
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
            if (tebakSession.has(id)) {
                if (m.key.fromMe) return
                await checkAnswer(id, parsedMsg.toLowerCase(), sock, quotedMessageId, noTel);
            } else {
                // Membaca semua file dalam folder plugins
                const pluginsDir = path.join(__dirname, 'plugins');
                const pluginFiles = fs.readdirSync(pluginsDir);

                // Mengimpor setiap plugin secara dinamis
                const plugins = {};
                for (const file of pluginFiles) {
                    if (file.endsWith('.js')) {
                        const pluginName = path.basename(file, '.js');
                        const { default: plugin } = await import(path.join(pluginsDir, file));
                        plugins[pluginName] = plugin;
                    }
                }

                if (plugins[cmd]) {
                    await plugins[cmd]({ sock, m, id, psn, sender, noTel, caption });
                }
            }

            // Menampilkan log informatif ketika ada pesan masuk
            console.log(chalk.green(`┌────────────────────────────────────────────────────┐`));
            console.log(chalk.green(`│`) + chalk.cyan(` Pesan Masuk `) + chalk.green(`│`));
            console.log(chalk.green(`├────────────────────────────────────────────────────┤`));
            console.log(chalk.green(`│`) + chalk.yellow(` Dari: `) + chalk.white(sender) + chalk.green(`│`));
            console.log(chalk.green(`│`) + chalk.yellow(` Nomor: `) + chalk.white(noTel) + chalk.green(`│`));
            console.log(chalk.green(`│`) + chalk.yellow(` Pesan: `) + chalk.white(parsedMsg) + chalk.green(`│`));
            console.log(chalk.green(`└────────────────────────────────────────────────────┘`));
        } catch (error) {
            console.log('_Ups, ada yang salah, silahkan coba beberapa saat lagi_', error)
            // sock.sendMessage()
        }
    })
    sock.ev.on('call', async (ev) => {
        call(ev, sock)
    });
    sock.ev.on('group-participants.update', async (ev) => {
        groupParticipants(ev, sock)
    });

    // Event listener for group updates
    sock.ev.on('groups.update', async (ev) => {
        groupUpdate(ev, sock);
    });
}).catch(error => console.log("Error starting Bot :", error))
