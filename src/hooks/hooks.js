import { useState, useEffect } from "react";
import { auth, db } from "../config/config";
// import {  doc, getDoc } from 'firebase/firestore'
import { query, collection, getDocs } from 'firebase/firestore'

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


/** 
 * Get submissions from firestore
 * @param {string} collectionName
 * @param {Array} filter
 */
function useFetchCollection(collectionName, filter = []) {
  const [fetching, setFetching] = useState(true);
  const [docs, setDocs] = useState({});

  const fetchDocs = () => {
    console.log('fetchDocs: Fetching...')
    setFetching(true);
    const q = query(collection(db, collectionName), ...filter);

    getDocs(q).then(snapshot => {
      const ls = {};
      snapshot.forEach(doc => {
        ls[doc.id] = { ...doc.data(), id: doc.id };
      });
      const ls_l = ls;
      setDocs(ls_l);
      setFetching(false);
    });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return { docs, setDocs, fetching, refetch: fetchDocs };
}

export { useAuthStatus, useFetchCollection };