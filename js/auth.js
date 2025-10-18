// Authentication System for Login and Signup

// Helper function to show alert messages
function showAlert(message, type) {
  const alertDiv = document.getElementById('alertMessage');
  if (!alertDiv) return;
  
  alertDiv.className = `alert alert-${type} mt-3`;
  alertDiv.innerHTML = message;
  alertDiv.classList.remove('d-none');
  
  setTimeout(() => {
    alertDiv.classList.add('d-none');
  }, 4000);
}

// Handle Login Form
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showAlert('Please fill in all fields.', 'danger');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const found = users.find(u => u.email === email && u.password === password);
  
  if (!found) {
    showAlert('Invalid email or password.', 'danger');
    return;
  }
  
  localStorage.setItem('currentUser', JSON.stringify(found));
  showAlert('Login successful! Redirecting...', 'success');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1200);
}

// Handle Signup Form
function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
  if (!name || !email || !phone || !password || !confirmPassword) {
    showAlert('Please fill in all fields.', 'danger');
    return;
  }
  
  if (password !== confirmPassword) {
    showAlert('Passwords do not match!', 'danger');
    return;
  }
  
  if (password.length < 4) {
    showAlert('Password must be at least 4 characters long.', 'danger');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.find(u => u.email === email)) {
    showAlert('This email is already registered.', 'danger');
    return;
  }
  
  users.push({ name, email, phone, password });
  localStorage.setItem('users', JSON.stringify(users));
  
  showAlert('Account created successfully! Redirecting...', 'success');
  
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1200);
}

// Initialize event listeners when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Attach login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
    
    // Attach signup form handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', handleSignup);
    }
  });
}
