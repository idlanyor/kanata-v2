export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    await sock.sendMessage(id, { text: `${await ytSearchResult(psn)}` })
};
