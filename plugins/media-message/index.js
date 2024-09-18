import { tomp3 } from "../../lib/mediaMsg/converter.js";
// import sticker from "../../lib/mediaMsg/sticker.js";
import { removebg } from "../../lib/mediaMsg/image.js";
import { gambarPdf } from "../../lib/mediaMsg/pdf.js";

export async function mediaMsg(sock, m, chatUpdate) {
    // await sticker(sock, m, chatUpdate);
    await removebg(sock, m, chatUpdate)
    await gambarPdf(sock, m, chatUpdate)
    await tomp3(sock, m, chatUpdate)
}