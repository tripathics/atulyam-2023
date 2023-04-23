import { useState, useEffect } from "react";
import { auth, db } from "../config/config";
import {  doc, getDoc } from 'firebase/firestore'

function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
        setCheckingStatus(false);

        // const docRef = doc(db, 'users', user.uid);
        // const docSnap = await getDoc(docRef);   
        // console.log(docSnap)

        // if (docSnap.exists()) {
        //     // console.log("Document data:", docSnap.data());
        // } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        //   }
    } else {
      setCheckingStatus(false)
    }
    })
  }, []);

  return { loggedIn, checkingStatus, admin };
}

export {useAuthStatus};