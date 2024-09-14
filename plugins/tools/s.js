import { createSticker, StickerTypes } from "wa-sticker-formatter";

// sticker
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
  console.log('attribute', attf)
  if (!attf instanceof Buffer) {
    await sock.sendMessage(m.key.remoteJid, { text: 'Kirim/reply gambar dengan caption s' });
    console.log('Media data not found');
    return;
  }
  const stickerOption = {
    pack: "Kanata",
    author: "KanataBot",
    type: StickerTypes.FULL,
    quality: 100
  }

  try {
    const generateSticker = await createSticker(attf, stickerOption);
    await sock.sendMessage(m.key.remoteJid, { sticker: generateSticker })
  } catch (error) {
    console.log('Error creating sticker:', error);
    await sock.sendMessage(m.key.remoteJid, { text: `Error creating sticker\n Reason :\n ${error}` })
  }
};
