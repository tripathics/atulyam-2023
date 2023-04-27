import { Route, Routes } from "react-router";
import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Events from './pages/Events';
import UpdateProfile from "./pages/UpdateProfile";
import Register from "./pages/Register";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter } from "react-router-dom";
import './styles/index.scss';
import UserProfile from "./pages/UserProfile";
import ProtectedComponent from "./components/ProtectedRoute";
import Alert from './components/Alert';

import { auth } from "./config/config";
import { useAuthStatus } from "./hooks/hooks";
import ScrollToTop from "./utils/helper";

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
    <Layout user={authUser}>
      {alertSeverity ? <Alert message={alertMsg} /> : <Alert message={alertMsg} severity={alertSeverity} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register"
          element={<ProtectedComponent
            isAdmin={false}
            children={<Register user={authUser} />}
          />}
        />
        <Route path="/update-profile"
          element={<ProtectedComponent
            isAdmin={false}
            children={<UpdateProfile updateProfile={updateAuthUserAttr} user={authUser} />}
          />}
        />
        <Route path="/signin" element={<SignIn user={authUser} logoutUser={handleLogout} />} />
        <Route path="/signup" element={<SignUp user={authUser} logoutUser={handleLogout} />} />
        <Route path="/user" element={
          <ProtectedComponent isAdmin={false} children={<UserProfile user={authUser} logoutUser={handleLogout} />} />
        } />
      </Routes>
    </Layout>
  );
}

export default App;
