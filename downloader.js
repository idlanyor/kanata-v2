import pkg from 'nayan-media-downloader';

const { tikdown, ndown, ytdown } = pkg;
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
        let result = await ytdown(url)
        console.log(result)
        return {
            thumbnail: result.data.thumbnail,
            title: result.data.title,
            audio: result.data.audio,
            video: result.data.video,
            channel: result.data.channel
        }
    } catch (error) {
        return error
    }
}

// console.log(await yutub('https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo'))
// console.log(await youtube.batchDownload(["https://www.youtube.com/watch?v=8tZlvoUZ-Ek&pp=ygUMeWEgYmVnaXR1bGFo"],1))
// console.log(await meta("https://www.instagram.com/reel/C81uiueJ4ho/?utm_source=ig_web_copy_link"))