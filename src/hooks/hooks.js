import { useState, useEffect } from "react";
import { auth, db } from "../config/config";
import { doc, getDoc } from 'firebase/firestore'
import { query, collection, getDocs } from 'firebase/firestore'


function useAuthStatus() {
  const [authUser, setAuthUser] = useState({ user: null, isProfileComplete: false, admin: false });
  const [checkingStatus, setCheckingStatus] = useState(true);

  const setUserAttr = (attr) => {
    setAuthUser({ ...authUser, ...attr });
  }

  const checkAuth = async (user) => {
    const update = { user: null, isProfileComplete: false, admin: false };
    if (user) {
      update.user = user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().isProfileComplete === true) {
        update.isProfileComplete = true;
      }
    }
    const result = { ...authUser, ...update };
    setAuthUser(result);
    setCheckingStatus(false);
  }

  useEffect(() => {
    auth.onAuthStateChanged(checkAuth);
  }, []);

  return { checkingStatus, authUser, updateAuthUserAttr: setUserAttr };
}

function useAuthStatusOld() {
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

export { useAuthStatusOld, useAuthStatus, useFetchCollection };