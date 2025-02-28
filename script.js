// The terminal text to simulate typing.
const terminalText = [
    { type: 'command', text: 'acquire eJPT cert' },
    { type: 'output', text: 'Host and Networking Auditing...Done' },
    { type: 'output', text: 'Host and Network Penetration Testing...Done' },
    { type: 'output', text: 'Web Application Penetration Testing...Done' },
    { type: 'output', text: 'Congratulations! eJPT Certification acquired!' },
    { type: 'command', text: 'acquire Security+ certification' },
    { type: 'loading', text: 'Loading' }  // Special type for animated loading
];

// DOM elements
const typedTextElement = document.getElementById('typed-text');

// Typing variables
let currentLine = 0;
let currentChar = 0;
let loadingInterval = null;  // For the animated "Loading..." effect

// Typing speed (adjust as needed)
const typingSpeed = 50;  // Speed in milliseconds per character

// Function to "type" text in the terminal
function typeTerminalText() {
    if (currentChar === 0) {
        // Add prompt only if it's a command
        if (terminalText[currentLine].type === 'command') {
            typedTextElement.innerHTML += 'Iustin@kali:~$ ';
        }
    }

    if (currentLine < terminalText.length) {
        if (currentChar < terminalText[currentLine].text.length) {
            // Add character by character
            typedTextElement.innerHTML += terminalText[currentLine].text[currentChar];
            currentChar++;
        } else {
            // When a line finishes, check if it's the loading line
            if (terminalText[currentLine].type === 'loading') {
                startLoadingAnimation();  // Start animated dots
                clearInterval(typingInterval);  // Stop normal typing
                return;  // Don't advance immediately
            } else {
                // Move to the next line after finishing the current line
                currentLine++;
                currentChar = 0;

                if (currentLine < terminalText.length) {
                    typedTextElement.innerHTML += '<br>';
                }
            }
        }
    } else {
        // Typing is done, clear the typing interval
        clearInterval(typingInterval);

        // Add final blinking cursor
        typedTextElement.innerHTML += '<br>Iustin@kali:~$ <span id="cursor" class="blinking-cursor">_</span>';
    }
}

// Function to animate the "Loading..." dots
function startLoadingAnimation() {
    let dots = 0;

    loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;  // Cycle from 0 to 3 dots
        const dotsText = '.'.repeat(dots);
        typedTextElement.innerHTML = typedTextElement.innerHTML.replace(/Loading\.{0,3}/, 'Loading' + dotsText);
    }, 500);
}

// Start the typing effect
const typingInterval = setInterval(typeTerminalText, typingSpeed);
