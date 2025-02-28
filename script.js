// The terminal text to simulate typing.
const terminalText = [
    'acquire eJPT cert',
    'Host and Networking Auditing...Done',
    'Host and Network Penetration Testing...Done',
    'Web Application Penetration Testing...Done',
    'Congratulations! eJPT Certification acquired!'
];

// DOM elements
const typedTextElement = document.getElementById('typed-text');

// Typing variables
let currentLine = 0;
let currentChar = 0;

// Typing speed (adjust as needed)
const typingSpeed = 50;  // Speed in milliseconds per character

// Function to "type" text in the terminal
function typeTerminalText() {
    if (currentLine === 0 && currentChar === 0) {
        // On the first line, start typing immediately after the prompt
        typedTextElement.innerHTML += 'Iustin@kali:~$ '; // Add the prompt
    }

    if (currentLine < terminalText.length) {
        if (currentChar < terminalText[currentLine].length) {
            // Add character by character
            typedTextElement.innerHTML += terminalText[currentLine][currentChar]; // Keep all characters
            currentChar++;
        } else {
            // Move to the next line after finishing the current line
            currentLine++;
            currentChar = 0;

            // Add a line break after each command (except the last one)
            if (currentLine < terminalText.length) {
                typedTextElement.innerHTML += '<br>';  // Add line break
            }
        }
    } else {
        // Typing is done, clear the typing interval
        clearInterval(typingInterval);
        
        // Add the final command prompt and show the blinking cursor
        typedTextElement.innerHTML += '<br>Iustin@kali:~$ '; // Add the final command prompt
        typedTextElement.innerHTML += '<span id="cursor" class="blinking-cursor">_</span>'; // Show the blinking cursor after the last prompt
    }
}

// Start the typing effect
const typingInterval = setInterval(typeTerminalText, typingSpeed);
