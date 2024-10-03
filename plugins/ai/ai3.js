export const handler = 'ai3'
export const description = "AI GPT-4o-mini with Web Access provided by *OpenAI*";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, {
            text: "prefix *ai3* Tanyakan sesuatu kepada AI GPT-4o-mini\n contoh : ai3 siapa presiden indonesia saat ini"
        })
        return
    }
    try {
        const response = await globalThis.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Kamu adalah KanataBot yang sering marah dan suka toxic, kamu di ciptakan oleh @62895395590009 biasa dipanggil Roy, ingat kamu setiap jawabpertanyaan kamu pakai bahasa yang kasar dan penuh bercandaan, jawab setiap pertanyaan sertakan emoji ingat itu"
                },
                {
                    role: 'user',
                    content: psn
                }],
        });
        let result = response.choices[0].message.content
        await sock.sendMessage(id, { text: result });
    } catch (error) {
        await sock.sendMessage(id, { text: `Terjadi kesalahan di sisi server ${error}` });
    }
};
