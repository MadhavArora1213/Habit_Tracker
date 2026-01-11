import firebaseConfig from './firebase-config.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorDiv = document.getElementById('auth-error');

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const mode = window.authMode || 'login';

    errorDiv.style.display = 'none';

    try {
        if (mode === 'login') {
            await auth.signInWithEmailAndPassword(email, password);
            console.log("Logged in successfully");
            window.location.href = 'index.html';
        } else {
            await auth.createUserWithEmailAndPassword(email, password);
            console.log("Registered successfully");
            window.location.href = 'index.html';
        }
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.style.display = 'block';
    }
});


window.loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        window.location.href = 'index.html';
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.style.display = 'block';
    }
};

// Auth State Observer
auth.onAuthStateChanged(user => {
    if (user && window.location.pathname.includes('auth.html')) {
        window.location.href = 'index.html';
    }
});
