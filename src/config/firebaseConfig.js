import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCl_KY51O2W5koBIZf9Pdp1GYiqeIPZz3I",
  authDomain: "daybreak-3979a.firebaseapp.com",
  databaseURL: "https://daybreak-1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "daybreak-3979a",
  storageBucket: "daybreak-3979a.firebasestorage.app",
  messagingSenderId: "1065548372608",
  appId: "1:1065548372608:web:487d243faf9b0d89bee465",
  measurementId: "G-B7FYNWLX6V"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
