import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDZP9okGI4yAQEWN82DmUWBYT6yZxXc7jY",
  authDomain: "daybreak-1.firebaseapp.com",
  databaseURL: "https://daybreak-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "daybreak-1",
  storageBucket: "daybreak-1.firebasestorage.app",
  messagingSenderId: "726482251150",
  appId: "1:726482251150:web:5e3b4e3e3bdd5633fb88df",
  measurementId: "G-Z9J69W8GC2"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
