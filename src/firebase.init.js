// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgJiR7HjLxEeq-N2Y-AoPx2bsTBHJfjU8",
  authDomain: "b10-a10-f5fed.firebaseapp.com",
  projectId: "b10-a10-f5fed",
  storageBucket: "b10-a10-f5fed.firebasestorage.app",
  messagingSenderId: "480204900600",
  appId: "1:480204900600:web:cbd97c52594df4c64fd30d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);