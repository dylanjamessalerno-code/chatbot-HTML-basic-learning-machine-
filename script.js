// 1. We need an object to store the words the bot "learns"
let brain = {};

function handleChat() {
    const inputField = document.getElementById('user-input');
    const sentence = inputField.value.trim();

    if (sentence !== "") {
        respond(sentence);
        learn(sentence); // Teach the bot the new words
        inputField.value = ""; // Clear the input
    }
}

function learn(sentence) {
    const words = sentence.toLowerCase().replace(/[^\w\s]/g, "").split(" ");
    words.forEach(word => {
        if (!brain[word]) {
            brain[word] = [];
        }
        brain[word].push(sentence);
    });
}

function respond(sentence) {
    const chatBox = document.getElementById('chat-box');
    const words = sentence.toLowerCase().replace(/[^\w\s]/g, "").split(" ");
    let botReply = "";

    if (sentence.includes('?') || sentence.includes('!')) {
        const allWords = Object.keys(brain);
        if (allWords.length > 0) {
            const randomStructure = Array.from({length: 3}, () => 
                allWords[Math.floor(Math.random() * allWords.length)]
            ).join(" ");
            botReply = `${randomStructure}`;
        } else {
            botReply = "I don't know enough words to answer that yet!";
        }
    } else {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const memories = brain[randomWord];
        
        // Check if we actually have memories for this specific word
        botReply = (memories && memories.length > 0) 
            ? `I know "${randomWord}" from: "${memories[Math.floor(Math.random() * memories.length)]}"`
            : "I just learned that word!";
    }

    chatBox.innerHTML += `<p><b>You:</b> ${sentence}</p>`;
    chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
