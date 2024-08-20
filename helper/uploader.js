import axios from 'axios'
import FormData from 'form-data'

export const telegraph = async (fileBuffer) => {
    try {
        const form = new FormData()
        form.append('file', fileBuffer)

        const response = await axios.post('https://telegra.ph/upload', form, {
            headers: {
                ...form.getHeaders()
            }
        })
        return `https://telegra.ph${response.data[0].src}`
    } catch (error) {
        throw error
    }
}

// (async () => {
//     try {
//         const result = await telegraph(fs.createReadStream('./image.png'))
//         console.log(result)
//     } catch (error) {
//         console.error('Error uploading file:', error)
//     }
// })()
