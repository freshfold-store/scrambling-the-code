// Message encoding and decoding functionality

// Function to encode/scramble a message
function encodeMessage(message) {
    // Simple encoding: reverse the string and apply base64
    const reversed = message.split('').reverse().join('');
    return btoa(reversed);
}

// Function to decode/unscramble a message
function decodeMessage(encoded) {
    try {
        // Decode base64 and reverse back
        const decoded = atob(encoded);
        return decoded.split('').reverse().join('');
    } catch (e) {
        return "Error: Invalid encoded message";
    }
}

// Function to handle scrambling
function scrambleMessage() {
    const inputField = document.getElementById('messageInput');
    const outputField = document.getElementById('output');
    
    if (!inputField || !outputField) {
        console.error('Required elements not found');
        return;
    }
    
    const message = inputField.value.trim();
    
    if (message === '') {
        outputField.textContent = 'Please enter a message to scramble.';
        return;
    }
    
    const scrambled = encodeMessage(message);
    outputField.textContent = scrambled;
}

// Function to handle decoding
function decodeMessageHandler() {
    const inputField = document.getElementById('messageInput');
    const outputField = document.getElementById('output');
    
    if (!inputField || !outputField) {
        console.error('Required elements not found');
        return;
    }
    
    const encoded = inputField.value.trim();
    
    if (encoded === '') {
        outputField.textContent = 'Please enter an encoded message to decode.';
        return;
    }
    
    const decoded = decodeMessage(encoded);
    outputField.textContent = decoded;
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const scrambleBtn = document.getElementById('scrambleBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    
    if (scrambleBtn) {
        scrambleBtn.addEventListener('click', scrambleMessage);
    }
    
    if (decodeBtn) {
        decodeBtn.addEventListener('click', decodeMessageHandler);
    }
});
