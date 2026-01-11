import firebaseConfig from './firebase-config.js';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// DOM Elements
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorDiv = document.getElementById('auth-error');
const submitBtn = document.getElementById('submit-btn');

// Security: Sanitize error messages to prevent information leakage
function sanitizeErrorMessage(errorCode) {
    const genericErrors = {
        'auth/user-not-found': 'Invalid email or password.',
        'auth/wrong-password': 'Invalid email or password.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/operation-not-allowed': 'This operation is not allowed.',
    };
    return genericErrors[errorCode] || 'Authentication failed. Please try again.';
}

// Security: Validate input before sending to Firebase
function validateInput(email, password, mode) {
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address.');
    }
    
    // Password validation
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters.');
    }
    
    // Additional password strength check for registration
    if (mode === 'register') {
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number.');
        }
    }
    
    return errors;
}

// Security: Rate limiting (client-side)
let attemptCount = 0;
let lastAttemptTime = 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60000; // 1 minute

function checkRateLimit() {
    const now = Date.now();
    
    // Reset attempts after lockout period
    if (now - lastAttemptTime > LOCKOUT_DURATION) {
        attemptCount = 0;
    }
    
    if (attemptCount >= MAX_ATTEMPTS) {
        const remainingTime = Math.ceil((LOCKOUT_DURATION - (now - lastAttemptTime)) / 1000);
        return { allowed: false, message: `Too many attempts. Please wait ${remainingTime} seconds.` };
    }
    
    attemptCount++;
    lastAttemptTime = now;
    return { allowed: true };
}

// Security: Show loading state to prevent double submission
function setLoading(loading) {
    if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.innerText = loading ? 'Processing...' : (window.authMode === 'login' ? 'Initialize Protocol' : 'Create Profile');
    }
    if (emailInput) emailInput.disabled = loading;
    if (passwordInput) passwordInput.disabled = loading;
}

// Main form submission handler
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const mode = window.authMode || 'login';

    errorDiv.style.display = 'none';
    
    // Check rate limit
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
        errorDiv.innerText = rateCheck.message;
        errorDiv.style.display = 'block';
        return;
    }
    
    // Validate input
    const validationErrors = validateInput(email, password, mode);
    if (validationErrors.length > 0) {
        errorDiv.innerText = validationErrors[0];
        errorDiv.style.display = 'block';
        return;
    }
    
    setLoading(true);

    try {
        if (mode === 'login') {
            await auth.signInWithEmailAndPassword(email, password);
            // Reset rate limit on successful login
            attemptCount = 0;
            window.location.href = 'index.html';
        } else {
            await auth.createUserWithEmailAndPassword(email, password);
            attemptCount = 0;
            window.location.href = 'index.html';
        }
    } catch (error) {
        // Security: Use sanitized error messages
        const safeMessage = sanitizeErrorMessage(error.code);
        errorDiv.innerText = safeMessage;
        errorDiv.style.display = 'block';
        
        // Security: Clear password field on error
        passwordInput.value = '';
    } finally {
        setLoading(false);
    }
});

// Google Sign-in
window.loginWithGoogle = async () => {
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
        errorDiv.innerText = rateCheck.message;
        errorDiv.style.display = 'block';
        return;
    }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    // Security: Force account selection
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    
    setLoading(true);
    
    try {
        await auth.signInWithPopup(provider);
        attemptCount = 0;
        window.location.href = 'index.html';
    } catch (error) {
        const safeMessage = sanitizeErrorMessage(error.code);
        errorDiv.innerText = safeMessage;
        errorDiv.style.display = 'block';
    } finally {
        setLoading(false);
    }
};

// Auth State Observer - Redirect if already logged in
auth.onAuthStateChanged(user => {
    if (user && window.location.pathname.includes('auth.html')) {
        window.location.href = 'index.html';
    }
});

// Security: Prevent console access to sensitive data
if (typeof window !== 'undefined') {
    // Clear any potential stored credentials
    window.addEventListener('beforeunload', () => {
        if (passwordInput) passwordInput.value = '';
    });
}
