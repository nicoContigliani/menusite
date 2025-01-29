import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { Almarai } from "next/font/google";

const data = process.env.NEXT_PUBLIC_FIREBASE_CONFIG

const firebaseConfig = {
  apiKey: "AIzaSyCXu9fNEQkwwyKEChptQGTNBHsOyp-IqpE",
  authDomain: "llakascript.firebaseapp.com",
  projectId: "llakascript",
  storageBucket: "llakascript.firebasestorage.app",
  messagingSenderId: "657861850105",
  appId: "1:657861850105:web:0c6ffd20b785715b514328",
  measurementId: "G-HM967NB15L"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

