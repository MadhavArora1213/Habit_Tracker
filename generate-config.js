/**
 * Generate Firebase Config from .env file
 * Run: node generate-config.js
 */

const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Parse .env content
const envVars = {};
envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim();
        }
    }
});

// Generate firebase-config.js content
const configContent = `// INTELLIGENCE™ CORE // FIREBASE CONFIGURATION
// Auto-generated from .env - DO NOT EDIT DIRECTLY
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

console.log('✅ firebase-config.js generated successfully from .env');
