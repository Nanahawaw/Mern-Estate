// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8c3e2.firebaseapp.com",
  projectId: "mern-estate-8c3e2",
  storageBucket: "mern-estate-8c3e2.appspot.com",
  messagingSenderId: "788573812934",
  appId: "1:788573812934:web:391505348f1a121ff43fc7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
