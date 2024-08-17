import moment from 'moment';
import os from 'os';

const calculatePing = function (timestamp, now) {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    await sock.sendMessage(id, { text: `Bot merespon dalam *_${calculatePing(m.messageTimestamp, Date.now())} detik_*` })
};
