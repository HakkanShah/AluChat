// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "aluchat",
  appId: "1:732620690544:web:7764019db0a62c1c5010b5",
  storageBucket: "aluchat.firebasestorage.app",
  apiKey: "AIzaSyCZ2-HH2WcR9WaxphBozK61Ri9YeupGn0A",
  authDomain: "aluchat.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "732620690544",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
