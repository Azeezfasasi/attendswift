// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5wy9pJQg58h5I2q-SpXCfJ7F-Fj6akVw",
  authDomain: "attendswift.firebaseapp.com",
  projectId: "attendswift",
//   storageBucket: "attendswift.firebasestorage.app",
  storageBucket: "attendswift.appspot.com",
  messagingSenderId: "37720321989",
  appId: "1:37720321989:web:4cdaed53ae3aa0239ea5ac",
  measurementId: "G-093FLL56DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;