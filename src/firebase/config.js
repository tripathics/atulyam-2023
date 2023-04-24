// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvZ6cyyOFEStVzSPVSFmemhCevnGGDN5w",
  authDomain: "atulyam2023-4fda3.firebaseapp.com",
  projectId: "atulyam2023-4fda3",
  storageBucket: "atulyam2023-4fda3.appspot.com",
  messagingSenderId: "254708007762",
  appId: "1:254708007762:web:997bf681cd96b5fa17708b",
  measurementId: "G-0WDCGPTG09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);