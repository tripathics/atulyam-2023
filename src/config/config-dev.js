// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1IyI523NWw4rYZhNPeE-YTsjbSd5wSU8",
  authDomain: "testlogin-d7bc0.firebaseapp.com",
  databaseURL: "https://testlogin-d7bc0-default-rtdb.firebaseio.com",
  projectId: "testlogin-d7bc0",
  storageBucket: "testlogin-d7bc0.appspot.com",
  messagingSenderId: "813761300520",
  appId: "1:813761300520:web:e8aab2e972c04292924d1d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db }