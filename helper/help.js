import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mundur sak level saka folder helper kanggo akses plugins
const pluginsDir = path.join(__dirname, '../plugins');

// Fungsi kanggo nggoleki kabeh file .js lan ngelompokke miturut subfolder
async function loadPlugins(dir) {
    let plugins = {};

    const list = fs.readdirSync(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {


            // Yen iku folder, rekursif golek file .js ning subfolder
            const subPlugins = await loadPlugins(filePath);
            const folderName = path.basename(filePath); // Nentokake jeneng folder
            if (folderName === 'hidden') {
                // Yen iku folder sing dikecualikan, skip
                console.log(`Subfolder ${folderName} dikecualikan`);
                continue;
            }
            if (!plugins[folderName]) {
                plugins[folderName] = [];
            }
            // Gabungake subPlugins ing folder utama
            Object.entries(subPlugins).forEach(([subFolder, pluginFiles]) => {
                if (!plugins[subFolder]) {
                    plugins[subFolder] = [];
                }
                plugins[subFolder].push(...pluginFiles);
            });
        } else if (file.endsWith('.js')) {
            // Yen iku file .js, load file
            const { default: plugin, description } = await import(pathToFileURL(filePath).href);
            const folderName = path.basename(path.dirname(filePath)); // Nentokake folder induk
            if (!plugins[folderName]) {
                plugins[folderName] = [];
            }
            // Tambahake info file lan description
            plugins[folderName].push({
                subfolder: folderName, // Jeneng subfolder
                file: file, // Nama file
                description: description || 'Tidak ada deskripsi' // Deskripsi
            });
        }
    }

    return plugins;
}

// Fungsi kanggo generate help message otomatis
export async function helpMessage() {
    const plugins = await loadPlugins(pluginsDir);
    // console.log(plugins)

    let caption = "𝗛𝗮𝗶,𝗮𝗸𝘂 𝗞𝗮𝗻𝗮𝘁𝗮,𝗮𝘀𝗶𝘀𝘁𝗲𝗻 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝘆𝗮𝗻𝗴 𝘀𝗶𝗮𝗽 𝗺𝗲𝗺𝗯𝗮𝗻𝘁𝘂𝗺𝘂,𝗯𝗲𝗿𝗶𝗸𝘂𝘁 𝗶𝗻𝗶 𝗱𝗮𝗳𝘁𝗮𝗿 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝘆𝗮𝗻𝗴 𝗯𝗶𝘀𝗮 𝗮𝗸𝘂 𝗹𝗮𝗸𝘂𝗶𝗻  :\n";

    for (const zakia in plugins) {
        // Nambah header folder
        caption += `❏┄┅━┅┄〈 〘 ${zakia.toUpperCase()} 〙\n`;

        // Nambah file-file ning folder kasebut
        plugins[zakia].forEach(plugin => {
            const command = plugin.file.replace('.js', ''); // Ngilangke .js saka jeneng file
            caption += `- *${command}* - ${plugin.description}\n`;
        });

        caption += '\n';
    }
    caption += 'ketik *help* untuk tampilan list ';

    return { caption, plugins };
}

// Contoh panggilan fungsi helpMessage kanggo tes
// (async () => {
//     const { caption } = await helpMessage();
//     console.log(caption);
// })();
