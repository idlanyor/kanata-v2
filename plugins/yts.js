const ytSearchResult = async (query) => {
    const hasilPencarian = await ytsearch(query);
    let text = '*Hasil Pencarian Youtube* :\n\n';
    hasilPencarian.forEach((hasil, index) => {
        text += `🗿 Hasil ke-${index + 1}\n`;
        text += `> 📚 *${hasil.title}*\n`;
        text += `> 🔗 ${hasil.url}\n\n`;
    });
    return text;
}
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    await sock.sendMessage(id, { text: `${await ytSearchResult(psn)}` })
};
