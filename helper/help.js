import { quotes } from "../features/random.js";
import { getUser } from "./database.js";

export async function helpMessage(sender, id) {
    try {
        let user = await getUser(id);

        // Periksa apakah user ada atau tidak
        if (!user) {
            user = {
                id: id,
                userName: sender,
                isPrem: false,
                points: 0,
                credit: 0
            };
        }

        function cek() {
            return `❏┄┅━┅┄〈 〘 Ingfo Member 〙
🗝 ID: ${user.id || id}
📝 NAMA: ${user.userName || sender}
✨ STATUS: ${user.isPrem ? 'Premium' : 'Not Premium'}
💯 POIN: ${user.points || 0}
💸 CREDIT: ${user.credit || 0}`;
        }

    let caption = `
*Kanata Bot*
_by Idlanyor_\n\n

Hai *${sender}*
Here My Command List

❏┄┅━┅┄〈 〘 Artificial Intelligence 〙
> gm - Chat With Gemini AI
> mistral - Chat With Mistral AI
> mixtral - Chat With Mixtral AI
> llama - Chat With Llama AI
> gemma - Chat With Gemma AI

❏┄┅━┅┄〈 〘 Downloader 〙
> td - Tiktok Downloader by Url
> tmd - Tiktok Audio downloader by Url
> igv - Instagram Video Downloader by Url
> igp - Instagram Picture Downloader by Url
> yd - Download Youtube video by url
> yp - Play Youtube audio by query
> yv - Play Youtube video by query
> ymd - Download Youtube music by url\n

❏┄┅━┅┄〈 〘 General 〙
> s - Stiker(send image with caption 's')
> rem - remove background from image

❏┄┅━┅┄〈 〘 Random 〙
> cerpen - Random cerpen from creative author
> kisahnabi <nama nabi> - Random 25 kisah nabi

❏┄┅━┅┄〈 〘 Mini Game 〙
> gambar - tebak gambar
> bendera - tebak bendera
> jenaka - tebak kata jenaka
> lontong - teka teki sulit

❏┄┅━┅┄〈 〘 Misc. 〙
> owner - nampilin nomor owner bot
> ping - buat ngecek kecepatan respons bot

${await quotes()}
`;

        console.log(caption);
        return caption;

    } catch (error) {
        console.log(error);
        return "Terjadi kesalahan saat mengambil data pengguna.";
    }
}

export const memberIngfo = (id) => {
    try {
        let user = getUser(id);

        if (!user) {
            return 'Anda belum terdaftar'
        }

        function cek() {
            return `❏┄┅━┅┄〈 〘 Ingfo Member 〙
🗝 ID: ${user.id || id}
📝 NAMA: ${user.userName || sender}
✨ STATUS: ${user.isPrem ? 'Premium' : 'Not Premium'}
💯 POIN: ${user.points || 0}
💸 CREDIT: ${user.credit || 0}`;
        }
        return cek()
    } catch (e) {
        return "Terjadi kesalahan saat mengambil data pengguna.";
    }
}