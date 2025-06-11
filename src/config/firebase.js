// REQUIRED ENV VARIABLES FOR FIREBASE:
// יש להכניס את הערכים האמיתיים של הפרויקט שלך ב-Firebase, לדוגמה:
// REACT_APP_FIREBASE_API_KEY=AIzaSy... (העתק מה-Firebase Console)
// REACT_APP_FIREBASE_AUTH_DOMAIN=daybreak-3979a.firebaseapp.com
// REACT_APP_FIREBASE_DATABASE_URL=https://daybreak-3979a.firebaseio.com
// REACT_APP_FIREBASE_PROJECT_ID=daybreak-3979a
// REACT_APP_FIREBASE_STORAGE_BUCKET=daybreak-3979a.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=... (העתק מה-Firebase Console)
// REACT_APP_FIREBASE_APP_ID=... (העתק מה-Firebase Console)

// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Throw error if any config value is missing
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    throw new Error(
      `Firebase config missing: ${key}. Please check your .env file and set all required REACT_APP_FIREBASE_* variables.`
    );
  }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
