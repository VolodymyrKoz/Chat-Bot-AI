import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
    })
);

const outputContainer = document.getElementById('output-container');
const userInput = document.getElementById('user-input');

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    outputContainer.appendChild(messageElement);
}

async function sendMessage() {
    const userMessage = userInput.value;
    displayMessage(`User: ${userMessage}`);

    const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
    });

    const aiMessage = response.data.choices[0].message.content;
    displayMessage(`AI: ${aiMessage}`);

    userInput.value = '';
}