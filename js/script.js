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

// Function to handle scrambling form submission
function handleScramble(event) {
    event.preventDefault(); // Prevent form submission that would clear the page
    
    const inputField = document.getElementById('userMessage');
    const outputArea = document.getElementById('outputArea');
    const outputText = document.getElementById('outputText');
    
    if (!inputField || !outputArea || !outputText) {
        console.error('Required elements not found');
        return;
    }
    
    const message = inputField.value.trim();
    
    if (message === '') {
        outputText.textContent = 'Please enter a message to scramble.';
        outputArea.style.display = 'block';
        return;
    }
    
    const scrambled = encodeMessage(message);
    outputText.textContent = scrambled;
    outputArea.style.display = 'block';
}

// Function to handle decoding form submission
function handleDecode(event) {
    event.preventDefault(); // Prevent form submission that would clear the page
    
    const inputField = document.getElementById('scrambledCode');
    const outputArea = document.getElementById('decodeOutputArea');
    const outputText = document.getElementById('decodeOutputText');
    
    if (!inputField || !outputArea || !outputText) {
        console.error('Required elements not found');
        return;
    }
    
    const encoded = inputField.value.trim();
    
    if (encoded === '') {
        outputText.textContent = 'Please enter an encoded message to decode.';
        outputArea.style.display = 'block';
        return;
    }
    
    const decoded = decodeMessage(encoded);
    outputText.textContent = decoded;
    outputArea.style.display = 'block';
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const scrambleForm = document.getElementById('encodeForm');
    const decodeForm = document.getElementById('decodeForm');
    
    if (scrambleForm) {
        scrambleForm.addEventListener('submit', handleScramble);
    }
    
    if (decodeForm) {
        decodeForm.addEventListener('submit', handleDecode);
    }
});
