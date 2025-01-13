// Authentication State Management
let currentUser = null;

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

// Login Handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
        // Here you would typically make an API call to your backend
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            if (remember) {
                localStorage.setItem('userEmail', email);
            }
            window.location.href = '/dashboard.html';
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

// Signup Handler
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    // Basic validation
    if (userData.password !== userData.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard.html';
        } else {
            throw new Error('Signup failed');
        }
    } catch (error) {
        alert('Signup failed: ' + error.message);
    }
});

// Logout Handler
document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.location.href = '/login.html';
});

// Initialize auth state
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a protected page
    if (window.location.pathname.includes('dashboard') || 
        window.location.pathname.includes('profile') || 
        window.location.pathname.includes('appointments')) {
        if (!checkAuth()) {
            return;
        }
    }

    // Auto-fill email if remembered
    const rememberedEmail = localStorage.getItem('userEmail');
    if (rememberedEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = rememberedEmail;
        }
    }
}); 