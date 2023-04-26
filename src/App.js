import { Route, Routes } from "react-router";
import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Events from './pages/Events';
import Profile from "./form/Profile";
import SignUp from "./form/SignUp";
import SignIn from "./pages/SignIn";
import AdminComponent from './components/AdminComponent';
import EventRegistration from "./form/EventRegistration";
import { BrowserRouter } from "react-router-dom";
import './styles/index.scss';
import UserProfile from "./pages/UserProfile";
import ProtectedComponent from "./components/ProtectedRoute";
import Alert from './components/Alert';

import { auth } from "./config/config";
import { useAuthStatus } from "./hooks/hooks";

function App() {
  const { checkingStatus, authUser, updateAuthUserAttr } = useAuthStatus();
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState(null);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setAlertMsg('Signed out!')
      })
      .catch((err) => { 
        setAlertMsg(err.message);
        setAlertSeverity('error'); 
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setAlertMsg('');
      setAlertSeverity(null);
    }, 5000);
  }, [alertMsg])

  return (
    <BrowserRouter>
      <Layout user={authUser}>
        {alertSeverity ? <Alert message={alertMsg} /> : <Alert message={alertMsg} severity={alertSeverity} />}
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={
            <ProtectedComponent isAdmin={false}
              children={ 
                <Profile updateProfile={updateAuthUserAttr} checkingStatus={checkingStatus} user={authUser} logoutUser={handleLogout} />
              } />
          } />

          <Route path="/signin" element={ <SignIn user={authUser} logoutUser={handleLogout} /> } />

          <Route path="/signup" element={ <SignUp user={authUser} logoutUser={handleLogout} /> } />

          <Route path="/register" element={
            <ProtectedComponent isAdmin={false} children={<EventRegistration user={authUser} />} />
          } />

          <Route path="/user" element={
            <ProtectedComponent isAdmin={false} children={<UserProfile user={authUser} logoutUser={handleLogout} />} />
          } />

          <Route path="/admin" element={
            <ProtectedComponent isAdmin={false} children={<AdminComponent user={authUser} logoutUser={handleLogout} />} />
          } />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
