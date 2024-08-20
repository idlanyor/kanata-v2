import { clearMessages } from '@umamdev/wabe'
import { wabe } from './helper/bot.js';
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

// Mendefinisikan __dirname kanggo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            // Yen iku folder, rekursif
            results = results.concat(findJsFiles(filePath));
        } else if (file.endsWith('.js')) {
            // Yen iku file .js, tambahake menyang results
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
        // Nunggu hasil pengecekan path
        await fs.promises.access(namaSesiPath, fs.constants.F_OK);
        // Direktori/session file ada, gunakan nomor dari config
        rl.close();
        return config.notelp;
    } catch (err) {
        // Direktori/session file tidak ada, minta input dari user
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
                    // const pluginsDir = path.join(__dirname, 'plugins');
                    // const pluginFiles = fs.readdirSync(pluginsDir);

                    // const plugins = {};
                    // for (const file of pluginFiles) {
                    //     if (file.endsWith('.js')) {
                    //         const pluginName = path.basename(file, '.js');
                    //         const { default: plugin } = await import(path.join(pluginsDir, file));
                    //         plugins[pluginName] = plugin;
                    //     }
                    // }
                    const pluginsDir = path.join(__dirname, 'plugins');
                    const pluginFiles = findJsFiles(pluginsDir);

                    const plugins = {};
                    for (const file of pluginFiles) {
                        const pluginName = path.basename(file, '.js');
                        const { default: plugin } = await import(pathToFileURL(file).href);
                        plugins[pluginName] = plugin;
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

}
startBot()