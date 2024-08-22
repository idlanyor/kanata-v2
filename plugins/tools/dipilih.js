export default async ({ sock, m, id }) => {
    console.log(m.message.pollUpdateMessage)
    const sendPoll = async (jid, name = '', values = [], quoted, selectableCount = 1, options = {}) => {
        return sock.sendMessage(jid, {
            poll: { name, values, selectableCount },
            options
        }, { quoted: quoted });
    };
    await sendPoll(id, 'Apa warna favorit Anda?', ['Merah', 'Biru', 'Hijau']);

    if (m.message && m.message.pollUpdateMessage) {
        const pollId = m.message.pollUpdateMessage.pollCreationMessageKey.id;
        const voterJid = m.key.participant;
        const vote = m.message.pollUpdateMessage.vote.selectedOptions;

        console.log(`Pengguna ${voterJid} telah melakukan vote di polling ${pollId} dengan pilihan: ${vote}`);
        // Lakukan sesuatu dengan data vote
    }
};
