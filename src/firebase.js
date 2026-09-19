import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsnmKrEL8RY7iEQlkLo1Ef1Xqw7bB4QBQ",
  authDomain: "gamefaktory-1b0b8.firebaseapp.com",
  projectId: "gamefaktory-1b0b8",
  storageBucket: "gamefaktory-1b0b8.firebasestorage.app",
  messagingSenderId: "95784943954",
  appId: "1:95784943954:web:907fb25872cada6edcba8b",
  measurementId: "G-WG9Q3T8XQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
