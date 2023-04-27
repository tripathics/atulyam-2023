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
import AnimatedRoutes from "./pages/AnimatedRoutes";

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
      <AnimatedRoutes authUser={authUser} handleLogout={handleLogout} updateAuthUserAttr={updateAuthUserAttr} />
    </Layout>
  );
}

export default App;
