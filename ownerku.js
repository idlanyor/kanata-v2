const _prem = require("./lib/premium.js");
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let ownerJid = global.owner + '@s.whatsapp.net'; // Ganti dengan nomor JID owner
let lastGreetTime = 0; // Waktu terakhir kali kirim pesan dalam timestamp (ms)
const greetInterval = 5 * 60 * 1000; // 10 menit dalam milidetik
let ownerGreeted = false; // Flag apakah sudah kirim pesan sambutan atau belum


ptz.ev.on("messages.upsert",
    async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
                await ptz.readMessages([mek.key]);
            }
            if (!ptz.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;

            const m = smsg(ptz, mek, store);
            require("./message")(ptz, m, chatUpdate, store);

            // Dapatkan waktu sekarang dalam timestamp (ms)
            const now = new Date().getTime();
            // let wjid = "@s.whatsapp.net"
            const isPremium = _prem.checkPremiumUser(m.sender, premium);
            // Cek jika pesan berasal dari owner
            if (mek.key.participant === ownerJid || mek.key.participant === ownerJid || mek.key.participant === ownerJid || isPremium) {
                // Cek apakah pertama kali owner ngechat atau sudah lebih dari 10 menit sejak terakhir kirim pesan
                if (!ownerGreeted || (now - lastGreetTime > greetInterval)) {
                    // Kirim pesan sambutan
                    let greetMsg = ""
                    if (isPremium) greetMsg = "ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ, ᴏᴡɴᴇʀᴋᴜ!"
                    else if (mek.key.participant === ownerJid) greetMsg = "ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ, ᴜꜱᴇʀ ᴘʀᴇᴍɪᴜᴍ!!"
                    await ptz.sendMessage(mek.key.remoteJid, {
                        document: fs.readFileSync("./database/Docu/PadilDev.docx"), // Path ke file MS Word
                        fileName: 'PadilDev.docx', // Nama file MS Word
                        mimetype: 'application/msword',
                        fileLength: 99999999999999999999999999999999999,
                        jpegThumbnail: fs.readFileSync("./thum.jpg"), // Gambar thumbnail
                        caption: greetMsg
                    }, {
                        quoted: {
                            key: {
                                remoteJid: 'status@broadcast',
                                participant: '0@s.whatsapp.net'
                            },
                            message: {
                                newsletterAdminInviteMessage: {
                                    newsletterJid: '120363293401077915@newsletter',
                                    newsletterName: '',
                                    caption: global.author
                                }
                            }
                        }
                    });

                    // Update waktu terakhir kirim pesan dan flag
                    lastGreetTime = now;
                    ownerGreeted = true;
                }
                console.log(mek)
            }

        } catch (err) {
            console.log(err);
        }
    });