// User Authentication and History Management System

// Get current logged-in user
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Sign up new user
function signup(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username]) {
        return { success: false, message: 'Username already exists!' };
    }
    
    users[username] = {
        password: btoa(password), // Simple encoding (in production, use proper hashing)
        history: [],
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Account created successfully!' };
}

// Login user
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[username]) {
        return { success: false, message: 'User not found!' };
    }
    
    if (users[username].password !== btoa(password)) {
        return { success: false, message: 'Incorrect password!' };
    }
    
    localStorage.setItem('currentUser', username);
    return { success: true, message: 'Login successful!' };
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Add encoding to history
function addToHistory(message, code) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const timestamp = new Date().toLocaleString();
    
    users[currentUser].history.unshift({
        message: message,
        code: code,
        timestamp: timestamp
    });
    
    // Keep only last 50 entries
    if (users[currentUser].history.length > 50) {
        users[currentUser].history = users[currentUser].history.slice(0, 50);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
}

// Get user history
function getHistory() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return users[currentUser]?.history || [];
}

// Display history in UI
function displayHistory() {
    const history = getHistory();
    const container = document.getElementById('historyContainer');
    
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No history yet. Start encoding messages!</p>';
        return;
    }
    
    container.innerHTML = history.map((item, index) => `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <h6 class="text-primary">
                    <i class="bi bi-chat-left-text"></i> Original Message:
                </h6>
                <p class="mb-2">${escapeHtml(item.message)}</p>
                <h6 class="text-success">
                    <i class="bi bi-code-slash"></i> Scrambled Code:
                </h6>
                <div class="bg-dark text-success p-2 rounded font-monospace" style="word-break: break-all;">
                    ${escapeHtml(item.code)}
                </div>
                <small class="text-muted">
                    <i class="bi bi-clock"></i> ${item.timestamp}
                </small>
            </div>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update navigation based on login status
function updateUserNav() {
    const currentUser = getCurrentUser();
    const userSection = document.getElementById('userSection');
    
    if (!userSection) return;
    
    if (currentUser) {
        userSection.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                   role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle"></i> ${escapeHtml(currentUser)}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#" id="logoutBtn">
                        <i class="bi bi-box-arrow-right"></i> Logout
                    </a></li>
                </ul>
            </li>
        `;
        
        // Add logout event listener
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    logout();
                }
            });
        }
    } else {
        userSection.innerHTML = `
            <a class="nav-link" href="login.html">
                <i class="bi bi-box-arrow-in-right"></i> Login
            </a>
        `;
    }
}

// Initialize on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        updateUserNav();
    });
}
