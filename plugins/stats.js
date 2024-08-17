import os from 'os';
async function systemSpec() {
    const platform = os.platform();
    const release = os.release();
    const osType = os.type();
    let OS = `OS: ${osType} (${platform} ${release})\n`

    // Informasi RAM
    const totalMem = os.totalmem() / (1024 ** 3); // Dalam GB
    const freeMem = os.freemem() / (1024 ** 3); // Dalam GB
    const usedMem = totalMem - freeMem;
    const uptime = os.uptime() / 3600; // Dalam jam

    const hours = Math.floor(uptime);
    const minutes = Math.floor((uptime - hours) * 60);
    const seconds = Math.floor(((uptime - hours) * 60 - minutes) * 60);
    // Informasi Bandwidth

    OS += `Total RAM: ${totalMem.toFixed(2)} GB \n`;
    OS += `RAM Terpakai: ${usedMem.toFixed(2)} GB \n`;
    OS += `RAM Tersedia: ${freeMem.toFixed(2)} GB \n`;
    OS += `Uptime: ${hours} jam ${minutes} menit ${seconds} detik \n`;
    OS += `Platform: ${platform} \n`;
    OS += `Release: ${release} \n`;
    OS += `Type: ${osType} \n`;

    // Informasi CPU
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        // console.log(`CPU ${index + 1}: ${cpu.model}, Kecepatan: ${cpu.speed} MHz /n`);
        OS += `CPU ${index + 1}: ${cpu.model} \n`;
    });

    return OS
}
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    await sock.sendMessage(id, { text: `${await systemSpec()}` })
};
