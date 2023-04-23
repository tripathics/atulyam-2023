// getting the accees via variable 

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// need to change this one 
const firebaseConfig = {
  apiKey: "AIzaSyDvZ6cyyOFEStVzSPVSFmemhCevnGGDN5w",
  authDomain: "atulyam2023-4fda3.firebaseapp.com",
  projectId: "atulyam2023-4fda3",
  storageBucket: "atulyam2023-4fda3.appspot.com",
  messagingSenderId: "254708007762",
  appId: "1:254708007762:web:997bf681cd96b5fa17708b",
  measurementId: "G-0WDCGPTG09"
};

  // firebase.initializeApp(firebaseConfig);
  // firebase.initializeApp(firebaseConfig);


  // variables that it will reaturn after calling import
  // const auth = firebase.auth()
  // const fs = firebase.firestore();
  // const storage= firebase.storage();

    // redoing from docs
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const googleProvider = auth.googleProvider;
 


 export {auth,db,googleProvider}
  // export {auth,fs}