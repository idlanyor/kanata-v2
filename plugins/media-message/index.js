import { tomp3 } from "../../features/converter";
import { removebg } from "../../features/image";
import { gambarPdf } from "../../features/pdf";
import sticker from "../../features/sticker";

export async function mediaMsg(sock, m, chatUpdate) {
    await sticker(sock, m, chatUpdate);
    await removebg(sock, m, chatUpdate)
    await gambarPdf(sock, m, chatUpdate)
    await tomp3(sock, m, chatUpdate)
}