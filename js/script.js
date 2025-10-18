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

// Function to copy output to clipboard
function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    if (!outputText) {
        console.error('Output text element not found');
        return;
    }
    
    const textToCopy = outputText.textContent;
    
    // Use the Clipboard API
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show success feedback
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="bi bi-check-circle"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Function to handle navigation
function handleNavigation(event, targetId) {
    event.preventDefault(); // Prevent default link behavior
    
    if (targetId === 'home') {
        // Scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else if (targetId === 'history') {
        // Check if user is logged in (placeholder - would need actual auth check)
        alert('History feature requires login. Please log in to view your encoding history.');
    } else if (targetId === 'about') {
        // Scroll to about section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handlers
    const scrambleForm = document.getElementById('encodeForm');
    const decodeForm = document.getElementById('decodeForm');
    
    if (scrambleForm) {
        scrambleForm.addEventListener('submit', handleScramble);
    }
    
    if (decodeForm) {
        decodeForm.addEventListener('submit', handleDecode);
    }
    
    // Copy to clipboard handler
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }
    
    // Navigation handlers
    const homeLink = document.getElementById('homeLink');
    const historyLink = document.getElementById('historyLink');
    const brandLink = document.getElementById('brandLink');
    
    if (homeLink) {
        homeLink.addEventListener('click', (e) => handleNavigation(e, 'home'));
    }
    
    if (historyLink) {
        historyLink.addEventListener('click', (e) => handleNavigation(e, 'history'));
    }
    
    if (brandLink) {
        brandLink.addEventListener('click', (e) => handleNavigation(e, 'home'));
    }
});
