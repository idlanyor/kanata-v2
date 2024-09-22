import MistralClient from "@mistralai/mistralai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { skizo } from "../helper/skizo.js";
import axios from "axios";

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
const aigem = new GoogleGenerativeAI(globalThis.apiKey.gemini)
const gem = aigem.getGenerativeModel({ model: 'gemini-1.5-flash' })
export async function gemini(prompt) {
    const result = await gem.generateContent(prompt);
    return result.response.text()
}
// mistral
const mistralClient = new MistralClient(globalThis.apiKey.mistral)
export async function mistral(content) {
    const response = await mistralClient.chat({
        model: 'mistral-large-latest',
        messages: [
            {
                role: 'system',
                content: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,kamu selalu merespons percakapan dalam bahasa gaul seperti gw untuk aku,dan lu untuk kamu,selalu sertakan emoji saat membalas pesan user'
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
const groq = new Groq({ apiKey: globalThis.apiKey.groq })
export async function gemmaGroq(content) {
    const cc = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,kamu selalu merespons percakapan dalam bahasa gaul seperti gw untuk aku,dan lu untuk kamu,selalu sertakan emoji saat membalas pesan user'
            },
            {
                role: 'user',
                content
            }
        ],
        model: 'llama3-70b-8192'
    })
    return cc.choices[0].message.content
}
// llamagrox
export async function llamaGroq(content) {
    const cc = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,kamu selalu merespons percakapan dalam bahasa gaul seperti gw untuk aku,dan lu untuk kamu,selalu sertakan emoji saat membalas pesan user'
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
                role: 'assistant',
                content: 'selalu balas percakapan dengan bahasa indonesia'
                // content: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,kamu selalu merespons percakapan dalam bahasa gaul seperti gw untuk aku,dan lu untuk kamu,selalu sertakan emoji saat membalas pesan user'
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

export async function gptSkizo(prompt) {
    const res = await skizo('openai', {
        params: {
            apikey: globalThis.apiHelper.skizotech.apikey,
            system: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,kamu selalu merespons percakapan dalam bahasa gaul seperti gw untuk aku,dan lu untuk kamu,selalu sertakan emoji saat membalas pesan user',
            text: prompt
        }
    })
    return res.data.result
}

export async function gptSkizo2(prompt) {
    const res = await skizo('openaiv2', {
        params: {
            apikey: globalThis.apiHelper.skizotech.apikey,
            system: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,sifatmu adalah pemarah dan tsundere,kamu pandai meroasting dan itu juga merupakan salah satu tugasmu,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,selalu sertakan emoji saat membalas pesan user',
            text: prompt
        }
    })
    return res.data.result
}
export async function chatgpt4(prompt) {
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
        headers: {
            'x-rapidapi-key': globalThis.apiHelper.rapid.gpt4.key,
            'x-rapidapi-host': globalThis.apiHelper.rapid.gpt4.host,
            'Content-Type': 'application/json'
        },
        data: {
            messages: [
                {
                    role: 'system',
                    system: 'Namamu adalah Kanata Bot,sebuah bot AI canggih yang dikembangkan oleh Roynaldi @62895395590009,sifatmu adalah pemarah dan tsundere,kamu bisa menerangkan sesuatu secara informatif dan mudah dipahami,selalu sertakan emoji saat membalas pesan user'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            web_access: true
        }
    };
    try {
        const response = await axios.request(options);
        return response.data.result
    } catch (error) {
        throw error
    }
}

// console.log(await chatgpt4('tampilin jadwal kualifikasi pildun 2026,tampilin dalam bentuk list'))

