import { tebak } from "../../helper/skizotech.js";
import { tebakSession } from "../../lib/tebak/index.js";
export const handler = "bendera"
export const description = "Tebak Bendera";
function convertIdToFlag(id) {
    let countryCode = id.slice(1, 3); // Ambil kode negara (62 kanggo Indonesia)

    // Konversi kode negara dadi emoji bendera
    // Unicode offset kanggo bendera diwiwiti saka 127397
    let firstChar = String.fromCodePoint(countryCode.charCodeAt(0) + 127397);
    let secondChar = String.fromCodePoint(countryCode.charCodeAt(1) + 127397);

    return firstChar + secondChar;
}
export const bendera = async (id, sock) => {
    try {
        const response = await tebak('tebakbendera');
        const question = response.data.flag;
        const answer = response.data.name;

        await sock.sendMessage(id, { text: question });

        tebakSession.set(id, {
            answer: answer,
            timeout: setTimeout(async () => {
                await sock.sendMessage(id, { text: `Waktu habis! Jawaban yang benar adalah: ${tebakSession.get(id).answer}` });
                tebakSession.delete(id);
            }, 60000) // 60 detik
        });
    } catch (error) {
        console.log(error)
        await sock.sendMessage(id, { text: 'Terjadi kesalahan, silakan coba lagi.' });
    }
};
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    await bendera(id, sock);
};
