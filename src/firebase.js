// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiZvhDuRfeafVbf7rsL0GvSPPKn_Hl4AI",
  authDomain: "portfolio-b0215.firebaseapp.com",
  projectId: "portfolio-b0215",
  storageBucket: "portfolio-b0215.firebasestorage.app",
  messagingSenderId: "278355912086",
  appId: "1:278355912086:web:54bd0111ca2f6b4a4e29b7",
  measurementId: "G-KGNP7DVVEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//npm install -g firebase-tools
