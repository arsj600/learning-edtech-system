// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "edtech-9f405.firebaseapp.com",
  projectId: "edtech-9f405",
  storageBucket: "edtech-9f405.firebasestorage.app",
  messagingSenderId: "505219218283",
  appId: "1:505219218283:web:5ae646865f3c8097ba2a2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app);
const provider =new GoogleAuthProvider()

export {auth,provider}