import { registerUser } from "../../helper/database.js"
export const description = "Register User";
export const handler = "reg"
export default async () => {
    if (psn === '') {
        sock.sendMessage(id, { text: "ketik *reg<spasi>namaKamu*,contoh `reg Roynaldi`" })
        return
    }
    // let idUser = id
    await registerUser({ id: noTel, userName: psn, isPrem: false, points: 0, credit: 10 })
    await sock.sendMessage(id, { text: `「 *REGISTRASI BERHASIL* 」\n🗝️ID: ${noTel.replace('@', '')}\n📝 NAMA: ${psn.toUpperCase()}\n✨ STATUS:Not Premium\n💯 POIN:0\n💸 CREDIT:10` })
}