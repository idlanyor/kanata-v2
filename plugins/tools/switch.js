export const description = "Switch Owner Bot";
export const handler = "switch"
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (noTel.replace('@', '') !== globalThis.ownerNumber) {
        await sock.sendMessage(id, { text: 'Kamu bukan owner bot' })
        return
    }
    await sock.sendMessage(id, { text: 'Bot berhasil ditukar' })
};
