# Little Kanata-Bot by RoiDev

This is a project that demonstrates the use of the Gemini API and GPT-3 API in whatsapp bot.

## Requirements

In order to run this project, you will need to have Node.js and NPM installed on your system.

## Installation

To install the required dependencies, run the following command in your terminal:

```bash
npm install
```

## Usage

To use this project, you will need to set up a Gemini API key and a GPT-3 API key. You can do this by renaming a file called `config.example.js` to `config.js` in the root directory of the project and adding the following code to it:

```javascript
const config = {
    gemini: 'YOUR_GEMINI_API_KEY',
    gpt: 'YOUR_GPT-3_API_KEY',
    notelp: '62xxx',
    namaSesi: 'mybot',
}

export default config
```

Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key and `YOUR_GPT-3_API_KEY` with your actual GPT-3 API key.

After that, you can start the project by running the following command in your terminal:

```bash
npm start
```

The project will start a WebSocket server that listens for incoming messages from WhatsApp. When a message is received, it will be passed to the `clearMessages` function, which will remove any unnecessary data and return the message in a standard format.

The message will then be passed to the appropriate API, depending on the command specified in the message. If the command is `gemini`, the message will be sent to the Gemini API, and the response will be sent back to the user. If the command is `gpt`, the message will be sent to the GPT-3 API, and the response will be sent back to the user.

If the user sends a message that is not a command, it will be sent to both APIs, and the responses will be combined and sent back to the user.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

I would like to thank the developers of the Gemini API and GPT-3 API for making their APIs available to the public. I would also like to thank the developers of Baileys, a WhatsApp library for Node.js, for making it easy to integrate with the WhatsApp API.

## Special thanks to 
- [UmamDev](https://github.com/UmamDev)
- [OpenAI](https://github.com/openai)
- [Google GenerativeAi](https://github.com/GoogleCloudPlatform/generative-ai)