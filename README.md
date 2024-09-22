<div align="center">
<h1>Little Kanata</h1>
<h2 style="color:#1496DC">RoiDev x PadilDev</h2>

![GitHub repo size](https://img.shields.io/github/repo-size/idlanyor/kanata-v2)
![GitHub stars](https://img.shields.io/github/stars/idlanyor/kanata-v2?style=social)
![GitHub license](https://img.shields.io/github/license/idlanyor/kanata-v2)

![Kanata](https://telegra.ph/file/8360caca1efd0f697d122.jpg)

</div>


This is a project that demonstrates how to use plugin modular stucture to make a Bot Whatsapp using Baileys

## Requirements

In order to run this project, you will need to have Node.js and NPM installed on your system.

## Installation

To install the required dependencies, run the following command in your terminal:

```bash
npm install
```

## Usage

To use this project, you will need to set up a Various API key. You can do this by renaming a file called `globalThis.example.js` to `globalThis.js` in the root directory of the project and adding the following code to it:

```javascript
const config = {

    gemini: 'YOUR_API_KEY',
    gpt: 'YOUR_API_KEY',
    mistral: 'YOUR_API_KEY',
    notelp: 'YOUR_BOT_PHONE_NUMBER',
    namaSesi: 'kanata_session',

    ownerNumber: 'YOUR_BOT_PHONE_NUMBER',

    apiHelper: {

        lolhuman: {

            apikey: 'YOUR_API_KEY',

            baseUrl: 'https://api.lolhuman.xyz/api/'

        },

        betabotz: {

            apikey: 'YOUR_API_KEY',

            baseUrl: 'https://api.betabotz.eu.org/api/'

        },

        skizotech: {

            apikey: 'YOUR_API_KEY',

            baseUrl: 'https://skizo.tech/api/'

        }

    },

    removeBG: 'YOUR_API_KEY',
    // groq
    groq: 'YOUR_API_KEY',
    // Ilovepdf
    pdf: {

        secret: 'YOUR_API_SECRET_KEY',

        public: 'YOUR_API_PUBLIC_KEY'

    }

}



export default config
```

Replace all value wit your own.

After that, you can start the project by running the following command in your terminal:

```bash
npm start
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Api Used

- [Google Generative AI](https://github.com/GoogleCloudPlatform/generative-ai)
- [Groq](https://groq.com/)
- [RemoveBG](https://www.remove.bg/id/api)
- [ILovePDF](https://www.iloveapi.com/)
- [BetaBotz](https://api.betabotz.eu.org/)
- [SkizoTech](https://skizo.tech/)
- [LolHuman](https://api.lolhuman.xyz/)

## Contributors
- [Roynaldi](https://github.com/idlanyor)
- [PadilDev](https://github.com/kumis-xd)
- [Puan Mahalini](https://github.com/puanmahalini)
