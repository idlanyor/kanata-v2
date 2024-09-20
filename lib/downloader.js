import pkg from 'nayan-media-downloader';
const { tikdown, ndown } = pkg;
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
export async function yutub(url) {
    try {
        let response = await nyxs(`dl/yt-direct`, {
            params: {
                url
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
        return error
    }
}

// await yutub('https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo')
// console.log(await yutub('https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo'))
// console.log(await youtube.batchDownload(["https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo"],1))
// console.log(await meta("https://www.instagram.com/reel/C81uiueJ4ho/?utm_source=ig_web_copy_link"))