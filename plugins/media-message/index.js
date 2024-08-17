import { tomp3 } from "../../features/converter.js";
import { removebg } from "../../features/image.js";
import { gambarPdf } from "../../features/pdf.js";
import sticker from "../../features/sticker.js";

export async function mediaMsg(sock, m, chatUpdate) {
    await sticker(sock, m, chatUpdate);
    await removebg(sock, m, chatUpdate)
    await gambarPdf(sock, m, chatUpdate)
    await tomp3(sock, m, chatUpdate)
}