import fs from 'fs'
import path from 'path'
export default async function loadAssets(namaFile, folder) {
    try {
        return await fs.promises.readFile(path.join(import.meta.dirname, '../assets', folder, namaFile))
    } catch (e) {
        throw e
    }
}
