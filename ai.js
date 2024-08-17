import MistralClient from "@mistralai/mistralai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import config from "./config.js";
import { skizo } from "./helper/skizo.js";


// skizo
export async function dalle3(prompt) {
    try {
        return (await skizo('dalle3', { params: { prompt: encodeURIComponent(prompt) } })).data.url
    } catch (error) {
        console.error('Terjadi Kesalahan', error)
    }
}
// console.log(await dalle3('anime loli kawaii'));


// text generation
// gemini
const aigem = new GoogleGenerativeAI(config.gemini)
const gem = aigem.getGenerativeModel({ model: 'gemini-1.5-flash' })
export async function gemini(prompt) {
    const result = await gem.generateContent(prompt);
    return result.response.text()
}
// mistral
const mistralClient = new MistralClient(config.mistral)
export async function mistral(content) {
    const response = await mistralClient.chat({
        model: 'mistral-large-latest',
        messages: [
            {
                role: 'assistant',
                content: 'Hai,selamat datang,namaku adalah Kanata,senang bertemu denganmu,apakah ada yang bisa aku bantu?'
            },
            {
                role: 'user',
                content
            }]
    })
    return response.choices[0].message.content
}

// groq
// gemmaGroq
const groq = new Groq({ apiKey: config.groq })
export async function gemmaGroq(content) {
    const cc = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'selalu balas percakapan dalam bahasa indonesia'
            },
            {
                role: 'user',
                content
            }
        ],
        model: 'gemma-7b-it'
    })
    return cc.choices[0].message.content
}
// llamagrox
export async function llamaGroq(content) {
    const cc = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'selalu balas percakapan dalam bahasa indonesia'
            },
            {
                role: 'user',
                content
            }
        ],
        model: 'llama3-8b-8192'
    })
    return cc.choices[0].message.content
}
// mistralGrox
export async function mixtralGroq(content) {
    const cc = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'selalu balas percakapan dalam bahasa indonesia'
            },
            {
                role: 'user',
                content
            }
        ],
        model: 'mixtral-8x7b-32768'
    })
    return cc.choices[0].message.content
}

