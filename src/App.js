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
import  UserProfile  from "./pages/UserProfile";
import ProtectedComponent from "./components/ProtectedRoute";


import { auth} from "./config/config";
import { useAuthStatus } from "./hooks/hooks";

function App() {

  const [user, setUser] = useState({ user: null, admin: false });
  const { checkingStatus, loggedIn, admin } = useAuthStatus();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser({ user: null, admin: false });
      })
      .catch((err) => { console.log(err) });
  }

  const handleLogin = (user) => {
    setUser(user);
  }

  useEffect(() => {
    if (!checkingStatus) {
      setUser({ user: loggedIn, admin: admin });
    }
    // eslint-disable-next-line
  }, [checkingStatus])
  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/events" element={
            <Events />
          } />
          <Route path="/profile" element={
            <ProtectedComponent isAdmin={false} children={<Profile user={user} loginUser={handleLogin} logoutUser={handleLogout} />} />
          } />

          <Route path="/signin" element={
            <SignIn user={user} loginUser={handleLogin} logoutUser={handleLogout}  />
          } />

          <Route path="/signup" element={
            <SignUp user={user} loginUser={handleLogin} logoutUser={handleLogout}  />
          } />

          <Route path="/register" element={
            <ProtectedComponent isAdmin={false} children={<EventRegistration user={user} loginUser={handleLogin} logoutUser={handleLogout} />} />
          } />

          <Route path="/user" element={
            <ProtectedComponent isAdmin={false} children={<UserProfile user={user} loginUser={handleLogin} logoutUser={handleLogout} />} />
          } />

          <Route path="/admin" element={
            <ProtectedComponent isAdmin={false} children={<AdminComponent user={user} loginUser={handleLogin} logoutUser={handleLogout} />} />
          } />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
