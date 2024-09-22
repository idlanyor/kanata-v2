import pkg from 'nayan-media-downloader';
const { tikdown, ndown, ytdown } = pkg;
import { nyxs } from '../helper/nxys.js';
export async function tiktok(url) {
    try {
        let result = await tikdown(url)
        return { title: result.data.title, video: result.data.video, audio: result.data.audio }
    } catch (error) {
        return error
    }
}
export async function meta(url) {
    try {
        let result = await ndown(url)
        return result.data[0].url
    } catch (error) {
        return error
    }
}
function getYouTubeId(url) {
    // Regex kanggo njupuk ID YouTube
    const match = url.match(/(?:v=|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);

    // Yen match ketemu, njupuk ID YouTube-nya
    return match ? match[1] : null;
}
export async function yutub(url) {
    let id = getYouTubeId(url);
    console.log(id)
    try {
        let response = await nyxs(`dl/yt-direct`, {
            params: {
                url: `https://www.youtube.com/watch?v=${id}`
            }
        })
        let result = await response.data.result
        return {
            thumbnail: result.thumbnail,
            title: result.title,
            duration: result.length,
            audio: result.urlAudio,
            video: result.urlVideo,
        }
    } catch (error) {
        return { error: error.message || "Terjadi kesalahan saat memproses permintaan." };
    }
}
export async function yutubVideo(url) {
    let id = getYouTubeId(url);
    console.log(id)
    try {
        let result = await ytdown(`https://www.youtube.com/watch?v=${id}`)
        return {
            thumbnail: result.data.picture,
            title: result.data.title,
            channel: result.data.author,
            video: result.data.video,
        }
    } catch (error) {
        return { error: error.message || "Terjadi kesalahan saat memproses permintaan." };
    }
}

// await yutub('https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo')
// console.log(await yutub('https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo'))
// console.log(await youtube.batchDownload(["https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo"],1))
// console.log(await meta("https://www.instagram.com/reel/C81uiueJ4ho/?utm_source=ig_web_copy_link"))