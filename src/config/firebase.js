// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCl_KY51O2W5koBIZf9Pdp1GYiqeIPZz3I",
  authDomain: "daybreak-3979a.firebaseapp.com",
  databaseURL: "https://daybreak-3979a.firebaseio.com",
  projectId: "daybreak-3979a",
  storageBucket: "daybreak-3979a.appspot.com",
  messagingSenderId: "1065548372608",
  appId: "1:1065548372608:web:487d243faf9b0d89bee465",
  measurementId: "G-B7FYNWLX6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
