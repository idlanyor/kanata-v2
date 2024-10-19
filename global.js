GNU nano 7.2         global.js
// variabel dasar
globalThis.owner = "Roynaldi";
globalThis.ownerNumber = "62895395590009"
globalThis.botNumber = "628157695152"
globalThis.sessionName = 'kanata-bot'

// fungsi dasar
globalThis.isOwner = (id) => {
    return id === globalThis.ownerNumber
}
globalThis.isBot = async (id) => {
    return id === botNumber
}

globalThis.isGroup = (jid) => {
    return jid.endsWith('@g.us')
}
// variabel apikey
globalThis.apiKey = {
    gemini: 'AIzaSyBmiAY7nBuRDVne17wfTsNdGeSVdw8j>
    gpt: 'sk-proj-XkIztzeeeT1vLNZNcAIhT3BlbkFJp6f>
    mistral: 'pksu20zEwUnzPxm71ptHtC38iHnZRBDC',
    removeBG: 'EhDFhCrjTZ15Hm1B5yW96FZz',
    groq: 'gsk_axVzqJvVYZPKvUBlujUCWGdyb3FYc0uaCP>
    pdf: {
        secret: 'secret_key_4084ef294b43b9fff9ed0>
        public: 'project_public_87b3a3b3021e2cadf>
    }
}

// variabel paired apikey with baseurl
globalThis.apiHelper = {
    medanpedia: {
        baseurl: 'https://api.medanpedia.co.id/',
        apiId: '27994',
        apiKey: 'hffyiq-z57gbh-fflacy-mvvk33-xoji>
    },
lolhuman: {

        apikey: 'yatanonagami',

        baseUrl: 'https://api.lolhuman.xyz/api/'

    },

    betabotz: {

        apikey: '66bb06f159b86d92a322',

        baseUrl: 'https://api.betabotz.eu.org/api>

    },

    skizotech: {

        apikey: 'yatanonagami',

        baseUrl: 'https://skizo.tech/api/'

    },
    nyxs: {
        apikey: '',
        baseUrl: 'https://api.nyxs.pw/'
    }

}