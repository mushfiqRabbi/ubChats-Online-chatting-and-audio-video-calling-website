// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNYisBJCAmpSSDA9CQrrkCvmHv60jlYTs",
  authDomain: "ub-chats.firebaseapp.com",
  projectId: "ub-chats",
  storageBucket: "ub-chats.appspot.com",
  messagingSenderId: "287467907511",
  appId: "1:287467907511:web:1d895f22d1960ee0062032",
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
