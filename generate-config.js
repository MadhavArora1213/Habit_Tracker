/**
 * Generate Firebase Config
 * - Uses .env file for local development
 * - Uses process.env (Vercel environment variables) for deployment
 * Run: node generate-config.js
 */

const fs = require('fs');
const path = require('path');

// Try to read from .env file first (local development)
let envVars = {};
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
    // Local development: read from .env file
    console.log('📁 Reading from .env file...');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                envVars[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
} else {
    // Vercel deployment: use process.env
    console.log('☁️ Reading from Vercel environment variables...');
    envVars = {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    };
}

// Validate required variables
const requiredVars = ['FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_PROJECT_ID'];
const missing = requiredVars.filter(v => !envVars[v]);

if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.error('Please set these in .env file (local) or Vercel dashboard (deployment)');
    process.exit(1);
}

// Generate firebase-config.js content
const configContent = `// INTELLIGENCE™ CORE // FIREBASE CONFIGURATION
// Auto-generated - DO NOT EDIT DIRECTLY
const firebaseConfig = {
  apiKey: "${envVars.FIREBASE_API_KEY || ''}",
  authDomain: "${envVars.FIREBASE_AUTH_DOMAIN || ''}",
  projectId: "${envVars.FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${envVars.FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${envVars.FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${envVars.FIREBASE_APP_ID || ''}",
  measurementId: "${envVars.FIREBASE_MEASUREMENT_ID || ''}"
};

export default firebaseConfig;
`;

// Write firebase-config.js
const configPath = path.join(__dirname, 'firebase-config.js');
fs.writeFileSync(configPath, configContent);

console.log('✅ firebase-config.js generated successfully!');
