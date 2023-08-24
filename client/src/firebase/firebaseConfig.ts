import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNYisBJCAmpSSDA9CQrrkCvmHv60jlYTs",
  authDomain: "ub-chats.firebaseapp.com",
  projectId: "ub-chats",
  storageBucket: "ub-chats.appspot.com",
  messagingSenderId: "287467907511",
  appId: "1:287467907511:web:1d895f22d1960ee0062032",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
