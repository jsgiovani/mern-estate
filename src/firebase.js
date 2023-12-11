// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: "real-estate-marketplace-1735c.firebaseapp.com",
  projectId: "real-estate-marketplace-1735c",
  storageBucket: "real-estate-marketplace-1735c.appspot.com",
  messagingSenderId: "409577870977",
  appId: "1:409577870977:web:505639b52e0cc4db009f80",
  measurementId: "G-MLJD7NHD5T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);