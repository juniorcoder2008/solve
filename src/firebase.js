import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyD33wIyZN4PuQEJxUG-116A29UXjApwpe0",
  authDomain: "solve-7d40e.firebaseapp.com",
  projectId: "solve-7d40e",
  storageBucket: "solve-7d40e.appspot.com",
  messagingSenderId: "153634399379",
  appId: "1:153634399379:web:53f1906b2e5b1ee2515966"
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();
