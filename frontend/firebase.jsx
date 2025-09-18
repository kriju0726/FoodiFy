// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodify-4b786.firebaseapp.com",
  projectId: "foodify-4b786",
  storageBucket: "foodify-4b786.firebasestorage.app",
  messagingSenderId: "173258469337",
  appId: "1:173258469337:web:5c6b232e58226340d7b3c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }