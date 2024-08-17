import { makeWASocket, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeInMemoryStore, PHONENUMBER_MCC, useMultiFileAuthState, DisconnectReason, Browsers } from "@whiskeysockets/baileys";
import pino from "pino";
import NodeCache from "node-cache";
import chalk from 'chalk';

class wabe {
    constructor(data) {
        this.phoneNumber = data.phoneNumber;
        this.sessionId = data.sessionId;
        this.useStore = data.useStore;
    }

    async start() {
        const msgRetryCounterCache = new NodeCache();
        const useStore = this.useStore;
        const MAIN_LOGGER = pino({
            timestamp: () => `,"time":"${new Date().toJSON()}"`,
        });

        const logger = MAIN_LOGGER.child({});
        logger.level = "silent";

        const store = useStore ? makeInMemoryStore({ logger }) : undefined;
        store?.readFromFile(`store-${this.sessionId}.json`);

        setInterval(() => {
            store?.writeToFile(`store-${this.sessionId}.json`);
        }, 10000 * 6);

        const P = pino({
            level: "silent",
        });
        let { state, saveCreds } = await useMultiFileAuthState(this.sessionId);
        let { version, isLatest } = await fetchLatestBaileysVersion();
        const sock = await makeWASocket({
            version,
            logger: P,
            printQRInTerminal: false,
            browser: Browsers.ubuntu("Chrome"),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, P),
            },
            msgRetryCounterCache,
            // Tambahkan opsi untuk meningkatkan stabilitas koneksi dan mencegah idle
            connectOptions: {
                maxRetries: 5, // Meningkatkan jumlah percobaan koneksi ulang
                keepAlive: true, // Aktifkan keep alive untuk mencegah koneksi idle
            },
        });

        store?.bind(sock.ev);

        sock.ev.on("creds.update", saveCreds);

        if (!sock.authState.creds.registered) {
            console.log(chalk.red("Mohon masukkan kode pairing"));
            const number = this.phoneNumber;
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            await delay(6000);
            const code = await sock.requestPairingCode(number);
            console.log(chalk.green("Kode Pairing: "), chalk.bold(code));
        }

        sock.ev.on("connection.update", async update => {
            const { connection, lastDisconnect } = update;
            if (connection === "connecting") {
                console.log(chalk.blue("Memulai koneksi soket"));
            } else if (connection === "open") {
                console.log(chalk.green("Soket terhubung"));
                // Melakukan ping periodik untuk memastikan koneksi tetap hidup
                // Tambahkan logika untuk merestart koneksi setelah terkoneksi untuk pertama kali
                if (lastDisconnect && lastDisconnect.error.output.statusCode === DisconnectReason.loggedOut) {
                    console.log(chalk.red("Koneksi terputus karena logout, mencoba kembali..."));
                    this.start().catch(() => this.start());
                }
            } else if (connection === "close") {
                if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
                    process.exit(0);
                } else {
                    console.log(chalk.red("Koneksi terputus, mencoba kembali..."));
                    this.start().catch(() => this.start());
                }
            }
        });

        return sock;
    }
}

async function clearMessages(m) {
    try {
        if (m === "undefined") return;
        let data;
        if (m.message?.conversation) {
            const text = m.message?.conversation.trim();
            if (m.key.remoteJid.endsWith("g.us")) {
                data = {
                    chatsFrom: "group",
                    remoteJid: m.key.remoteJid,
                    participant: {
                        fromMe: m.key.fromMe,
                        number: m.key.participant,
                        pushName: m.pushName,
                        message: text,
                    },
                };
            } else {
                data = {
                    chatsFrom: "private",
                    remoteJid: m.key.remoteJid,
                    fromMe: m.key.fromMe,
                    pushName: m.pushName,
                    message: text,
                };
            }
            if (typeof text !== "undefined") {
                return data;
            } else {
                return m;
            }
        } else if (m.message?.extendedTextMessage) {
            const text = m.message?.extendedTextMessage.text.trim();
            if (m.key.remoteJid.endsWith("g.us")) {
                data = {
                    chatsFrom: "group",
                    remoteJid: m.key.remoteJid,
                    participant: {
                        fromMe: m.key.fromMe,
                        number: m.key.participant,
                        pushName: m.pushName,
                        message: text,
                    },
                };
            } else {
                data = {
                    chatsFrom: "private",
                    remoteJid: m.key.remoteJid,
                    fromMe: m.key.fromMe,
                    pushName: m.pushName,
                    message: text,
                };
            }
            if (typeof text !== "undefined") {
                return data;
            } else {
                return m;
            }
        }
    } catch (err) {
        console.log(chalk.red("Error: "), err);
        return m;
    }
}

export { wabe, clearMessages };
